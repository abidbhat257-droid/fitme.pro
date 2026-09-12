from types import SimpleNamespace

from fastapi.testclient import TestClient

import server


class FakeCollection:
    def __init__(self):
        self.data = {}

    async def insert_one(self, document):
        self.data[document["id"]] = document
        return object()

    async def find_one(self, query, projection=None):
        return self.data.get(query.get("user_id"))

    async def update_one(self, query, update, upsert=False):
        doc = dict(update["$set"])
        doc["user_id"] = query["user_id"]
        self.data[query["user_id"]] = doc
        return object()


def test_profile_round_trip(monkeypatch):
    profiles = FakeCollection()
    status_checks = FakeCollection()
    monkeypatch.setattr(server, "db", SimpleNamespace(profiles=profiles, status_checks=status_checks))

    client = TestClient(server.app)

    payload = {
        "user_id": "user-123",
        "measurements": {
            "unit": "metric",
            "height": "180",
            "weight": "80",
        },
        "goals": [{"id": "goal-1", "targetWeight": 75}],
    }

    response = client.post("/api/profile", json=payload)
    assert response.status_code == 200, response.text
    saved = response.json()
    assert saved["user_id"] == "user-123"
    assert saved["measurements"]["weight"] == "80"

    fetched = client.get("/api/profile/user-123")
    assert fetched.status_code == 200, fetched.text
    assert fetched.json()["user_id"] == "user-123"


def test_status_check_still_works(monkeypatch):
    profiles = FakeCollection()
    status_checks = FakeCollection()
    monkeypatch.setattr(server, "db", SimpleNamespace(profiles=profiles, status_checks=status_checks))

    client = TestClient(server.app)

    response = client.post("/api/status", json={"client_name": "github-copilot"})
    assert response.status_code == 200, response.text
    assert response.json()["client_name"] == "github-copilot"
