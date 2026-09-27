import React from "react";
import { Link } from "react-router-dom";

const faqs = [
  ["What is BMI?", "BMI (Body Mass Index) is a weight-to-height index calculated from body weight and height. For adults, it is commonly used as a screening measure for weight categories, not as a diagnosis."],
  ["How do I calculate BMI?", "For metric units, BMI = weight in kilograms ÷ height in meters squared. For pounds and inches, BMI = 703 × weight in pounds ÷ height in inches squared."],
  ["What is a healthy BMI?", "For adults, a BMI from 18.5 to less than 25 is commonly classified as healthy weight. BMI should still be interpreted alongside other health information."],
  ["Is BMI the same as body fat percentage?", "No. BMI uses only height and weight. Body-fat percentage attempts to estimate the proportion of body weight that is fat."],
  ["Is BMI accurate for muscular people?", "BMI can be less representative for highly muscular people because the calculation cannot distinguish muscle from fat."],
  ["Does BMI work for children?", "Children and adolescents should not generally be interpreted using adult BMI categories. BMI-for-age uses age- and sex-specific growth references."],
  ["Can BMI tell me my ideal weight?", "BMI can be used to calculate a broad reference weight range for a given height, but it cannot identify one universally ideal weight for every individual."],
  ["Why can two people with the same BMI have different health profiles?", "BMI does not show body-fat distribution, muscle mass, fitness, medical history, or other factors that influence health."],
  ["How often should I calculate BMI?", "Recalculate when your weight or height information changes or when you are reviewing a longer-term trend. Repeated daily calculations are usually unnecessary."],
  ["Does FitMe Pro's BMI calculator diagnose obesity?", "No. FitMe Pro provides an educational BMI estimate. A BMI category is a screening result and should not be treated as a medical diagnosis."],
];

const bmiQuestions = [
  {
    "number": 1,
    "category": "Core Definitions & Basics",
    "question": "What is BMI?",
    "answer": "BMI is a calculated measure of weight relative to height. For adults it is used as a screening measure, not a diagnosis."
  },
  {
    "number": 2,
    "category": "Core Definitions & Basics",
    "question": "What does BMI stand for?",
    "answer": "BMI is a calculated measure of weight relative to height. For adults it is used as a screening measure, not a diagnosis."
  },
  {
    "number": 3,
    "category": "Core Definitions & Basics",
    "question": "Why is BMI used?",
    "answer": "BMI is a calculated measure of weight relative to height. For adults it is used as a screening measure, not a diagnosis."
  },
  {
    "number": 4,
    "category": "Core Definitions & Basics",
    "question": "Is BMI a measurement of body fat?",
    "answer": "BMI is a calculated measure of weight relative to height. For adults it is used as a screening measure, not a diagnosis."
  },
  {
    "number": 5,
    "category": "Core Definitions & Basics",
    "question": "What is a healthy BMI for adults?",
    "answer": "BMI is a calculated measure of weight relative to height. For adults it is used as a screening measure, not a diagnosis."
  },
  {
    "number": 6,
    "category": "Core Definitions & Basics",
    "question": "What does a BMI number tell me?",
    "answer": "BMI is a calculated measure of weight relative to height. For adults it is used as a screening measure, not a diagnosis."
  },
  {
    "number": 7,
    "category": "Core Definitions & Basics",
    "question": "Is BMI a health score?",
    "answer": "BMI is a calculated measure of weight relative to height. For adults it is used as a screening measure, not a diagnosis."
  },
  {
    "number": 8,
    "category": "Core Definitions & Basics",
    "question": "Is BMI a diagnosis?",
    "answer": "BMI is a calculated measure of weight relative to height. For adults it is used as a screening measure, not a diagnosis."
  },
  {
    "number": 9,
    "category": "Core Definitions & Basics",
    "question": "Why is BMI called a screening measure?",
    "answer": "BMI is a calculated measure of weight relative to height. For adults it is used as a screening measure, not a diagnosis."
  },
  {
    "number": 10,
    "category": "Core Definitions & Basics",
    "question": "What is the difference between BMI and body weight?",
    "answer": "BMI is a calculated measure of weight relative to height. For adults it is used as a screening measure, not a diagnosis."
  },
  {
    "number": 11,
    "category": "Calculation & Formulas",
    "question": "How do I calculate BMI?",
    "answer": "BMI is calculated from height and weight. Metric BMI is weight in kilograms divided by height in meters squared; imperial BMI uses 703 × pounds divided by inches squared."
  },
  {
    "number": 12,
    "category": "Calculation & Formulas",
    "question": "What is the BMI formula in metric units?",
    "answer": "BMI is calculated from height and weight. Metric BMI is weight in kilograms divided by height in meters squared; imperial BMI uses 703 × pounds divided by inches squared."
  },
  {
    "number": 13,
    "category": "Calculation & Formulas",
    "question": "What is the BMI formula in pounds and inches?",
    "answer": "BMI is calculated from height and weight. Metric BMI is weight in kilograms divided by height in meters squared; imperial BMI uses 703 × pounds divided by inches squared."
  },
  {
    "number": 14,
    "category": "Calculation & Formulas",
    "question": "How do I calculate BMI from kilograms and centimeters?",
    "answer": "BMI is calculated from height and weight. Metric BMI is weight in kilograms divided by height in meters squared; imperial BMI uses 703 × pounds divided by inches squared."
  },
  {
    "number": 15,
    "category": "Calculation & Formulas",
    "question": "How do I calculate BMI from pounds and feet?",
    "answer": "BMI is calculated from height and weight. Metric BMI is weight in kilograms divided by height in meters squared; imperial BMI uses 703 × pounds divided by inches squared."
  },
  {
    "number": 16,
    "category": "Calculation & Formulas",
    "question": "Why is height squared in the BMI formula?",
    "answer": "BMI is calculated from height and weight. Metric BMI is weight in kilograms divided by height in meters squared; imperial BMI uses 703 × pounds divided by inches squared."
  },
  {
    "number": 17,
    "category": "Calculation & Formulas",
    "question": "What units does BMI use?",
    "answer": "BMI is calculated from height and weight. Metric BMI is weight in kilograms divided by height in meters squared; imperial BMI uses 703 × pounds divided by inches squared."
  },
  {
    "number": 18,
    "category": "Calculation & Formulas",
    "question": "How do I convert centimeters to meters for BMI?",
    "answer": "BMI is calculated from height and weight. Metric BMI is weight in kilograms divided by height in meters squared; imperial BMI uses 703 × pounds divided by inches squared."
  },
  {
    "number": 19,
    "category": "Calculation & Formulas",
    "question": "How do I convert pounds to kilograms for BMI?",
    "answer": "BMI is calculated from height and weight. Metric BMI is weight in kilograms divided by height in meters squared; imperial BMI uses 703 × pounds divided by inches squared."
  },
  {
    "number": 20,
    "category": "Calculation & Formulas",
    "question": "How do I convert feet and inches to centimeters?",
    "answer": "BMI is calculated from height and weight. Metric BMI is weight in kilograms divided by height in meters squared; imperial BMI uses 703 × pounds divided by inches squared."
  },
  {
    "number": 21,
    "category": "Calculation & Formulas",
    "question": "Does rounding height change BMI?",
    "answer": "BMI is calculated from height and weight. Metric BMI is weight in kilograms divided by height in meters squared; imperial BMI uses 703 × pounds divided by inches squared."
  },
  {
    "number": 22,
    "category": "Calculation & Formulas",
    "question": "Why can two BMI calculators give slightly different results?",
    "answer": "BMI is calculated from height and weight. Metric BMI is weight in kilograms divided by height in meters squared; imperial BMI uses 703 × pounds divided by inches squared."
  },
  {
    "number": 23,
    "category": "Ranges, Categories & Charts",
    "question": "What are the adult BMI categories?",
    "answer": "For adults 20 and older, common categories are underweight below 18.5, healthy weight 18.5 to less than 25, overweight 25 to less than 30, and obesity 30 or greater."
  },
  {
    "number": 24,
    "category": "Ranges, Categories & Charts",
    "question": "What BMI is underweight?",
    "answer": "For adults 20 and older, common categories are underweight below 18.5, healthy weight 18.5 to less than 25, overweight 25 to less than 30, and obesity 30 or greater."
  },
  {
    "number": 25,
    "category": "Ranges, Categories & Charts",
    "question": "What BMI is healthy weight?",
    "answer": "For adults 20 and older, common categories are underweight below 18.5, healthy weight 18.5 to less than 25, overweight 25 to less than 30, and obesity 30 or greater."
  },
  {
    "number": 26,
    "category": "Ranges, Categories & Charts",
    "question": "What BMI is overweight?",
    "answer": "For adults 20 and older, common categories are underweight below 18.5, healthy weight 18.5 to less than 25, overweight 25 to less than 30, and obesity 30 or greater."
  },
  {
    "number": 27,
    "category": "Ranges, Categories & Charts",
    "question": "What BMI is obesity?",
    "answer": "For adults 20 and older, common categories are underweight below 18.5, healthy weight 18.5 to less than 25, overweight 25 to less than 30, and obesity 30 or greater."
  },
  {
    "number": 28,
    "category": "Ranges, Categories & Charts",
    "question": "What is Class 1 obesity BMI?",
    "answer": "For adults 20 and older, common categories are underweight below 18.5, healthy weight 18.5 to less than 25, overweight 25 to less than 30, and obesity 30 or greater."
  },
  {
    "number": 29,
    "category": "Ranges, Categories & Charts",
    "question": "What is Class 2 obesity BMI?",
    "answer": "For adults 20 and older, common categories are underweight below 18.5, healthy weight 18.5 to less than 25, overweight 25 to less than 30, and obesity 30 or greater."
  },
  {
    "number": 30,
    "category": "Ranges, Categories & Charts",
    "question": "What is Class 3 obesity BMI?",
    "answer": "For adults 20 and older, common categories are underweight below 18.5, healthy weight 18.5 to less than 25, overweight 25 to less than 30, and obesity 30 or greater."
  },
  {
    "number": 31,
    "category": "Ranges, Categories & Charts",
    "question": "Is BMI 18.5 healthy?",
    "answer": "For adults 20 and older, common categories are underweight below 18.5, healthy weight 18.5 to less than 25, overweight 25 to less than 30, and obesity 30 or greater."
  },
  {
    "number": 32,
    "category": "Ranges, Categories & Charts",
    "question": "Is BMI 24.9 healthy?",
    "answer": "For adults 20 and older, common categories are underweight below 18.5, healthy weight 18.5 to less than 25, overweight 25 to less than 30, and obesity 30 or greater."
  },
  {
    "number": 33,
    "category": "Ranges, Categories & Charts",
    "question": "Is BMI 25 overweight?",
    "answer": "For adults 20 and older, common categories are underweight below 18.5, healthy weight 18.5 to less than 25, overweight 25 to less than 30, and obesity 30 or greater."
  },
  {
    "number": 34,
    "category": "Ranges, Categories & Charts",
    "question": "Is BMI 30 obesity?",
    "answer": "For adults 20 and older, common categories are underweight below 18.5, healthy weight 18.5 to less than 25, overweight 25 to less than 30, and obesity 30 or greater."
  },
  {
    "number": 35,
    "category": "Ranges, Categories & Charts",
    "question": "How do I calculate the weight range for a BMI category?",
    "answer": "For adults 20 and older, common categories are underweight below 18.5, healthy weight 18.5 to less than 25, overweight 25 to less than 30, and obesity 30 or greater."
  },
  {
    "number": 36,
    "category": "Age-Specific BMI",
    "question": "Does BMI change with age?",
    "answer": "Children and teens are interpreted differently from adults. Ages 2–19 use sex-specific BMI-for-age percentiles, while adults 20 and older use adult BMI categories."
  },
  {
    "number": 37,
    "category": "Age-Specific BMI",
    "question": "Does BMI work for teenagers?",
    "answer": "Children and teens are interpreted differently from adults. Ages 2–19 use sex-specific BMI-for-age percentiles, while adults 20 and older use adult BMI categories."
  },
  {
    "number": 38,
    "category": "Age-Specific BMI",
    "question": "Does BMI work for children?",
    "answer": "Children and teens are interpreted differently from adults. Ages 2–19 use sex-specific BMI-for-age percentiles, while adults 20 and older use adult BMI categories."
  },
  {
    "number": 39,
    "category": "Age-Specific BMI",
    "question": "How is BMI interpreted for a 15-year-old?",
    "answer": "Children and teens are interpreted differently from adults. Ages 2–19 use sex-specific BMI-for-age percentiles, while adults 20 and older use adult BMI categories."
  },
  {
    "number": 40,
    "category": "Age-Specific BMI",
    "question": "How is BMI interpreted for a 10-year-old?",
    "answer": "Children and teens are interpreted differently from adults. Ages 2–19 use sex-specific BMI-for-age percentiles, while adults 20 and older use adult BMI categories."
  },
  {
    "number": 41,
    "category": "Age-Specific BMI",
    "question": "Does BMI work for babies?",
    "answer": "Children and teens are interpreted differently from adults. Ages 2–19 use sex-specific BMI-for-age percentiles, while adults 20 and older use adult BMI categories."
  },
  {
    "number": 42,
    "category": "Age-Specific BMI",
    "question": "What BMI is healthy for a 20-year-old?",
    "answer": "Children and teens are interpreted differently from adults. Ages 2–19 use sex-specific BMI-for-age percentiles, while adults 20 and older use adult BMI categories."
  },
  {
    "number": 43,
    "category": "Age-Specific BMI",
    "question": "What BMI is healthy for a 30-year-old?",
    "answer": "Children and teens are interpreted differently from adults. Ages 2–19 use sex-specific BMI-for-age percentiles, while adults 20 and older use adult BMI categories."
  },
  {
    "number": 44,
    "category": "Age-Specific BMI",
    "question": "What BMI is healthy for a 40-year-old?",
    "answer": "Children and teens are interpreted differently from adults. Ages 2–19 use sex-specific BMI-for-age percentiles, while adults 20 and older use adult BMI categories."
  },
  {
    "number": 45,
    "category": "Age-Specific BMI",
    "question": "What BMI is healthy for a 50-year-old?",
    "answer": "Children and teens are interpreted differently from adults. Ages 2–19 use sex-specific BMI-for-age percentiles, while adults 20 and older use adult BMI categories."
  },
  {
    "number": 46,
    "category": "Age-Specific BMI",
    "question": "What BMI is healthy for a 60-year-old?",
    "answer": "Children and teens are interpreted differently from adults. Ages 2–19 use sex-specific BMI-for-age percentiles, while adults 20 and older use adult BMI categories."
  },
  {
    "number": 47,
    "category": "Age-Specific BMI",
    "question": "What BMI is healthy for a 70-year-old?",
    "answer": "Children and teens are interpreted differently from adults. Ages 2–19 use sex-specific BMI-for-age percentiles, while adults 20 and older use adult BMI categories."
  },
  {
    "number": 48,
    "category": "Age-Specific BMI",
    "question": "Why is BMI-for-age used for children instead of adult BMI?",
    "answer": "Children and teens are interpreted differently from adults. Ages 2–19 use sex-specific BMI-for-age percentiles, while adults 20 and older use adult BMI categories."
  },
  {
    "number": 49,
    "category": "Gender & Demographic Differences",
    "question": "Is BMI different for men and women?",
    "answer": "The standard adult BMI calculation and CDC category cutoffs do not change by sex or race, although body composition and health-risk relationships can differ between populations."
  },
  {
    "number": 50,
    "category": "Gender & Demographic Differences",
    "question": "Do men and women use the same BMI formula?",
    "answer": "The standard adult BMI calculation and CDC category cutoffs do not change by sex or race, although body composition and health-risk relationships can differ between populations."
  },
  {
    "number": 51,
    "category": "Gender & Demographic Differences",
    "question": "Are adult BMI cutoffs different by sex?",
    "answer": "The standard adult BMI calculation and CDC category cutoffs do not change by sex or race, although body composition and health-risk relationships can differ between populations."
  },
  {
    "number": 52,
    "category": "Gender & Demographic Differences",
    "question": "Does ethnicity affect BMI interpretation?",
    "answer": "The standard adult BMI calculation and CDC category cutoffs do not change by sex or race, although body composition and health-risk relationships can differ between populations."
  },
  {
    "number": 53,
    "category": "Gender & Demographic Differences",
    "question": "Does BMI work the same for every ethnic group?",
    "answer": "The standard adult BMI calculation and CDC category cutoffs do not change by sex or race, although body composition and health-risk relationships can differ between populations."
  },
  {
    "number": 54,
    "category": "Gender & Demographic Differences",
    "question": "Are BMI cutoffs different for Asian adults?",
    "answer": "The standard adult BMI calculation and CDC category cutoffs do not change by sex or race, although body composition and health-risk relationships can differ between populations."
  },
  {
    "number": 55,
    "category": "Gender & Demographic Differences",
    "question": "Is BMI different for athletes?",
    "answer": "The standard adult BMI calculation and CDC category cutoffs do not change by sex or race, although body composition and health-risk relationships can differ between populations."
  },
  {
    "number": 56,
    "category": "Gender & Demographic Differences",
    "question": "Is BMI accurate for bodybuilders?",
    "answer": "The standard adult BMI calculation and CDC category cutoffs do not change by sex or race, although body composition and health-risk relationships can differ between populations."
  },
  {
    "number": 57,
    "category": "Gender & Demographic Differences",
    "question": "Is BMI accurate for older adults?",
    "answer": "The standard adult BMI calculation and CDC category cutoffs do not change by sex or race, although body composition and health-risk relationships can differ between populations."
  },
  {
    "number": 58,
    "category": "Gender & Demographic Differences",
    "question": "Is BMI accurate during pregnancy?",
    "answer": "The standard adult BMI calculation and CDC category cutoffs do not change by sex or race, although body composition and health-risk relationships can differ between populations."
  },
  {
    "number": 59,
    "category": "Accuracy, Limitations & Misconceptions",
    "question": "How accurate is BMI?",
    "answer": "BMI can be useful for screening but cannot directly measure body fat, muscle, fat distribution, fitness, or many other factors that affect health."
  },
  {
    "number": 60,
    "category": "Accuracy, Limitations & Misconceptions",
    "question": "Can BMI be misleading?",
    "answer": "BMI can be useful for screening but cannot directly measure body fat, muscle, fat distribution, fitness, or many other factors that affect health."
  },
  {
    "number": 61,
    "category": "Accuracy, Limitations & Misconceptions",
    "question": "Can two people have the same BMI but different body fat?",
    "answer": "BMI can be useful for screening but cannot directly measure body fat, muscle, fat distribution, fitness, or many other factors that affect health."
  },
  {
    "number": 62,
    "category": "Accuracy, Limitations & Misconceptions",
    "question": "Can BMI be high without high body fat?",
    "answer": "BMI can be useful for screening but cannot directly measure body fat, muscle, fat distribution, fitness, or many other factors that affect health."
  },
  {
    "number": 63,
    "category": "Accuracy, Limitations & Misconceptions",
    "question": "Can BMI be low with high body fat?",
    "answer": "BMI can be useful for screening but cannot directly measure body fat, muscle, fat distribution, fitness, or many other factors that affect health."
  },
  {
    "number": 64,
    "category": "Accuracy, Limitations & Misconceptions",
    "question": "Does BMI measure visceral fat?",
    "answer": "BMI can be useful for screening but cannot directly measure body fat, muscle, fat distribution, fitness, or many other factors that affect health."
  },
  {
    "number": 65,
    "category": "Accuracy, Limitations & Misconceptions",
    "question": "Does BMI measure muscle?",
    "answer": "BMI can be useful for screening but cannot directly measure body fat, muscle, fat distribution, fitness, or many other factors that affect health."
  },
  {
    "number": 66,
    "category": "Accuracy, Limitations & Misconceptions",
    "question": "Does BMI measure bone density?",
    "answer": "BMI can be useful for screening but cannot directly measure body fat, muscle, fat distribution, fitness, or many other factors that affect health."
  },
  {
    "number": 67,
    "category": "Accuracy, Limitations & Misconceptions",
    "question": "Does BMI measure fitness?",
    "answer": "BMI can be useful for screening but cannot directly measure body fat, muscle, fat distribution, fitness, or many other factors that affect health."
  },
  {
    "number": 68,
    "category": "Accuracy, Limitations & Misconceptions",
    "question": "Does BMI account for body-fat distribution?",
    "answer": "BMI can be useful for screening but cannot directly measure body fat, muscle, fat distribution, fitness, or many other factors that affect health."
  },
  {
    "number": 69,
    "category": "Accuracy, Limitations & Misconceptions",
    "question": "Does BMI account for muscle mass?",
    "answer": "BMI can be useful for screening but cannot directly measure body fat, muscle, fat distribution, fitness, or many other factors that affect health."
  },
  {
    "number": 70,
    "category": "Accuracy, Limitations & Misconceptions",
    "question": "How often should I calculate BMI?",
    "answer": "BMI can be useful for screening but cannot directly measure body fat, muscle, fat distribution, fitness, or many other factors that affect health."
  },
  {
    "number": 71,
    "category": "Accuracy, Limitations & Misconceptions",
    "question": "What should I use with BMI for a fuller picture?",
    "answer": "BMI can be useful for screening but cannot directly measure body fat, muscle, fat distribution, fitness, or many other factors that affect health."
  },
  {
    "number": 72,
    "category": "Accuracy, Limitations & Misconceptions",
    "question": "Is a lower BMI always healthier?",
    "answer": "BMI can be useful for screening but cannot directly measure body fat, muscle, fat distribution, fitness, or many other factors that affect health."
  },
  {
    "number": 73,
    "category": "Health Risks & Medical Implications",
    "question": "Does BMI predict health by itself?",
    "answer": "BMI is associated with health risks at a population level, but individual risk depends on many factors and BMI should be considered alongside other health information."
  },
  {
    "number": 74,
    "category": "Health Risks & Medical Implications",
    "question": "What health risks are associated with higher BMI?",
    "answer": "BMI is associated with health risks at a population level, but individual risk depends on many factors and BMI should be considered alongside other health information."
  },
  {
    "number": 75,
    "category": "Health Risks & Medical Implications",
    "question": "Can high BMI increase diabetes risk?",
    "answer": "BMI is associated with health risks at a population level, but individual risk depends on many factors and BMI should be considered alongside other health information."
  },
  {
    "number": 76,
    "category": "Health Risks & Medical Implications",
    "question": "Can high BMI increase heart disease risk?",
    "answer": "BMI is associated with health risks at a population level, but individual risk depends on many factors and BMI should be considered alongside other health information."
  },
  {
    "number": 77,
    "category": "Health Risks & Medical Implications",
    "question": "Can high BMI increase blood pressure risk?",
    "answer": "BMI is associated with health risks at a population level, but individual risk depends on many factors and BMI should be considered alongside other health information."
  },
  {
    "number": 78,
    "category": "Health Risks & Medical Implications",
    "question": "Does low BMI have health risks?",
    "answer": "BMI is associated with health risks at a population level, but individual risk depends on many factors and BMI should be considered alongside other health information."
  },
  {
    "number": 79,
    "category": "Health Risks & Medical Implications",
    "question": "Is a higher BMI always unhealthy?",
    "answer": "BMI is associated with health risks at a population level, but individual risk depends on many factors and BMI should be considered alongside other health information."
  },
  {
    "number": 80,
    "category": "Health Risks & Medical Implications",
    "question": "Can gaining muscle increase BMI?",
    "answer": "BMI is associated with health risks at a population level, but individual risk depends on many factors and BMI should be considered alongside other health information."
  },
  {
    "number": 81,
    "category": "Health Risks & Medical Implications",
    "question": "Can losing weight lower BMI?",
    "answer": "BMI is associated with health risks at a population level, but individual risk depends on many factors and BMI should be considered alongside other health information."
  },
  {
    "number": 82,
    "category": "Health Risks & Medical Implications",
    "question": "Can BMI be used to monitor weight loss?",
    "answer": "BMI is associated with health risks at a population level, but individual risk depends on many factors and BMI should be considered alongside other health information."
  },
  {
    "number": 83,
    "category": "Health Risks & Medical Implications",
    "question": "Can BMI alone determine whether someone is healthy?",
    "answer": "BMI is associated with health risks at a population level, but individual risk depends on many factors and BMI should be considered alongside other health information."
  },
  {
    "number": 84,
    "category": "Health Risks & Medical Implications",
    "question": "When should I discuss my BMI with a healthcare professional?",
    "answer": "BMI is associated with health risks at a population level, but individual risk depends on many factors and BMI should be considered alongside other health information."
  },
  {
    "number": 85,
    "category": "Weight Loss, Fitness & Goals",
    "question": "Should I lose weight based only on BMI?",
    "answer": "BMI can help describe changes in weight relative to height, but it should not be used alone to set individualized weight-loss or fitness targets."
  },
  {
    "number": 86,
    "category": "Weight Loss, Fitness & Goals",
    "question": "Can BMI tell me how much weight I should lose?",
    "answer": "BMI can help describe changes in weight relative to height, but it should not be used alone to set individualized weight-loss or fitness targets."
  },
  {
    "number": 87,
    "category": "Weight Loss, Fitness & Goals",
    "question": "Can BMI tell me my ideal weight?",
    "answer": "BMI can help describe changes in weight relative to height, but it should not be used alone to set individualized weight-loss or fitness targets."
  },
  {
    "number": 88,
    "category": "Weight Loss, Fitness & Goals",
    "question": "What weight corresponds to a healthy BMI?",
    "answer": "BMI can help describe changes in weight relative to height, but it should not be used alone to set individualized weight-loss or fitness targets."
  },
  {
    "number": 89,
    "category": "Weight Loss, Fitness & Goals",
    "question": "Can I use BMI to set a fitness goal?",
    "answer": "BMI can help describe changes in weight relative to height, but it should not be used alone to set individualized weight-loss or fitness targets."
  },
  {
    "number": 90,
    "category": "Weight Loss, Fitness & Goals",
    "question": "Should athletes use BMI for goal setting?",
    "answer": "BMI can help describe changes in weight relative to height, but it should not be used alone to set individualized weight-loss or fitness targets."
  },
  {
    "number": 91,
    "category": "Weight Loss, Fitness & Goals",
    "question": "Can BMI help track a weight-loss goal?",
    "answer": "BMI can help describe changes in weight relative to height, but it should not be used alone to set individualized weight-loss or fitness targets."
  },
  {
    "number": 92,
    "category": "Weight Loss, Fitness & Goals",
    "question": "Can BMI help track a muscle-gain goal?",
    "answer": "BMI can help describe changes in weight relative to height, but it should not be used alone to set individualized weight-loss or fitness targets."
  },
  {
    "number": 93,
    "category": "Weight Loss, Fitness & Goals",
    "question": "How can BMI be used alongside body-fat percentage?",
    "answer": "BMI can help describe changes in weight relative to height, but it should not be used alone to set individualized weight-loss or fitness targets."
  },
  {
    "number": 94,
    "category": "Weight Loss, Fitness & Goals",
    "question": "What other measurements should I track with BMI?",
    "answer": "BMI can help describe changes in weight relative to height, but it should not be used alone to set individualized weight-loss or fitness targets."
  },
  {
    "number": 95,
    "category": "Medical, Clinical & Industry Cutoffs",
    "question": "What is the clinical BMI cutoff for obesity?",
    "answer": "BMI thresholds are standardized screening categories in many clinical and public-health settings. Medical decisions should consider BMI together with other relevant information."
  },
  {
    "number": 96,
    "category": "Medical, Clinical & Industry Cutoffs",
    "question": "What is the clinical BMI cutoff for overweight?",
    "answer": "BMI thresholds are standardized screening categories in many clinical and public-health settings. Medical decisions should consider BMI together with other relevant information."
  },
  {
    "number": 97,
    "category": "Medical, Clinical & Industry Cutoffs",
    "question": "What is the clinical BMI cutoff for underweight?",
    "answer": "BMI thresholds are standardized screening categories in many clinical and public-health settings. Medical decisions should consider BMI together with other relevant information."
  },
  {
    "number": 98,
    "category": "Medical, Clinical & Industry Cutoffs",
    "question": "How is BMI used in clinical practice?",
    "answer": "BMI thresholds are standardized screening categories in many clinical and public-health settings. Medical decisions should consider BMI together with other relevant information."
  },
  {
    "number": 99,
    "category": "Medical, Clinical & Industry Cutoffs",
    "question": "How is BMI used in public health?",
    "answer": "BMI thresholds are standardized screening categories in many clinical and public-health settings. Medical decisions should consider BMI together with other relevant information."
  },
  {
    "number": 100,
    "category": "Medical, Clinical & Industry Cutoffs",
    "question": "Can BMI be used for medical decisions?",
    "answer": "BMI thresholds are standardized screening categories in many clinical and public-health settings. Medical decisions should consider BMI together with other relevant information."
  }
];

export default function BMISEOContent() {
  return (
    <article className="border-t border-border pt-10 mt-2 space-y-6" aria-label="BMI Calculator complete guide">
      <section>
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--brand-lime)] mb-2">BMI Guide</div>
        <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-tighter">BMI Calculator: What Your Result Means</h2>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
          Calculate your Body Mass Index from height and weight, then use the result to understand the standard adult BMI categories. BMI is a simple screening measure that puts body weight into context with height. It is useful, but it does not directly measure body fat or provide a complete picture of health.
        </p>
      </section>

      <section className="border border-border bg-card p-6 sm:p-7">
        <h3 className="font-display text-xl uppercase tracking-tight mb-3">Quick Answer</h3>
        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
          <strong className="text-foreground">BMI = weight (kg) ÷ height² (m²).</strong> For adults, commonly used categories are underweight below 18.5, healthy weight from 18.5 to 24.9, overweight from 25.0 to 29.9, and obesity at 30 or above. These categories are screening ranges, not a diagnosis.
        </p>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-3">What Does Your BMI Result Mean?</h3>
        <div className="overflow-x-auto border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-card">
                <th className="text-left p-3 font-bold uppercase tracking-wider">BMI</th>
                <th className="text-left p-3 font-bold uppercase tracking-wider">Adult category</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border"><td className="p-3">Below 18.5</td><td className="p-3">Underweight</td></tr>
              <tr className="border-b border-border"><td className="p-3">18.5–24.9</td><td className="p-3">Healthy weight</td></tr>
              <tr className="border-b border-border"><td className="p-3">25.0–29.9</td><td className="p-3">Overweight</td></tr>
              <tr className="border-b border-border"><td className="p-3">30.0–34.9</td><td className="p-3">Obesity, Class 1</td></tr>
              <tr className="border-b border-border"><td className="p-3">35.0–39.9</td><td className="p-3">Obesity, Class 2</td></tr>
              <tr><td className="p-3">40.0+</td><td className="p-3">Obesity, Class 3</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          These are commonly used adult screening categories. BMI does not diagnose obesity or another medical condition, and the meaning of a result can depend on body composition and individual circumstances.
        </p>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-3">BMI Formula</h3>
        <div className="space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <p><strong className="text-foreground">Metric:</strong> BMI = weight in kilograms ÷ height in meters².</p>
          <p><strong className="text-foreground">Imperial:</strong> BMI = 703 × weight in pounds ÷ height in inches².</p>
          <p>The calculator converts units when necessary and applies the same mathematical definition regardless of whether you enter metric or imperial measurements.</p>
        </div>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-3">How BMI Is Calculated</h3>
        <ol className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <li><strong className="text-foreground">1. Measure height.</strong> Measure without shoes and use a consistent unit.</li>
          <li><strong className="text-foreground">2. Measure weight.</strong> Use a reliable scale and record the value in the selected unit.</li>
          <li><strong className="text-foreground">3. Convert units if needed.</strong> The standard metric equation uses kilograms and meters.</li>
          <li><strong className="text-foreground">4. Square height.</strong> Multiply height in meters by itself.</li>
          <li><strong className="text-foreground">5. Divide weight by squared height.</strong> The result is BMI in kg/m².</li>
        </ol>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-3">Worked BMI Example</h3>
        <div className="border border-border bg-card p-6">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">Suppose an adult weighs <strong className="text-foreground">70 kg</strong> and is <strong className="text-foreground">1.75 m</strong> tall.</p>
          <p className="mt-3 font-mono-data text-sm sm:text-base">BMI = 70 ÷ (1.75 × 1.75) = 22.9 kg/m²</p>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">A BMI of about 22.9 falls within the commonly used healthy-weight category for adults.</p>
        </div>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-3">BMI vs. Body Fat Percentage</h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          BMI and body-fat percentage are different measurements. BMI describes weight relative to height, while body-fat percentage estimates how much of body weight is fat. A person with substantial muscle mass can have a relatively high BMI without having a high body-fat percentage. For a broader body-composition picture, compare BMI with waist measurements and an appropriate body-fat estimate rather than treating one number as definitive.
        </p>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-3">Factors That Affect BMI Interpretation</h3>
        <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <li><strong className="text-foreground">Muscle mass:</strong> BMI cannot separate muscle from fat.</li>
          <li><strong className="text-foreground">Fat distribution:</strong> BMI does not show where body fat is stored.</li>
          <li><strong className="text-foreground">Age:</strong> adult categories are not the same as BMI-for-age assessment in children and adolescents.</li>
          <li><strong className="text-foreground">Pregnancy:</strong> standard adult BMI interpretation is not designed to assess pregnancy weight gain.</li>
          <li><strong className="text-foreground">Population differences:</strong> relationships between BMI, body fat and health risk can vary between populations.</li>
        </ul>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-3">Accuracy and Limitations</h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          BMI is mathematically precise when height and weight are measured accurately, but biological interpretation is not equally precise. BMI does not directly measure body fat, muscle, bone density, waist distribution, fitness, or metabolic health. It is therefore best used as one screening indicator alongside other relevant measurements and health information. If a result is unexpected or important to a medical decision, discuss it with a qualified healthcare professional.
        </p>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-3">Better Inputs Produce Better Tracking</h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          For useful trends, measure height and weight consistently. Use the same scale when possible, keep the scale on a stable surface, and avoid comparing measurements taken under very different conditions. A single change in scale weight does not necessarily represent a comparable change in body fat because hydration, glycogen, food contents and other short-term factors can affect weight.
        </p>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-3">Use BMI With Complementary Measures</h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          BMI becomes more informative when it is considered with complementary measures. If your goal is body composition, compare it with <Link className="text-foreground underline underline-offset-4 hover:text-[var(--brand-lime)]" to="/body-fat-calculator">body-fat percentage</Link>, <Link className="text-foreground underline underline-offset-4 hover:text-[var(--brand-lime)]" to="/lean-body-mass-calculator">lean body mass</Link>, and <Link className="text-foreground underline underline-offset-4 hover:text-[var(--brand-lime)]" to="/waist-to-height-ratio-calculator">waist-to-height ratio</Link>. For weight planning, see the <Link className="text-foreground underline underline-offset-4 hover:text-[var(--brand-lime)]" to="/healthy-weight-range-calculator">healthy weight range</Link> and <Link className="text-foreground underline underline-offset-4 hover:text-[var(--brand-lime)]" to="/ideal-body-weight-calculator">ideal body weight</Link> calculators. These measures answer different questions and should not be treated as interchangeable.
        </p>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-3">BMI FAQs</h3>
        <div className="space-y-5">
          {faqs.map(([q, a]) => (
            <div key={q} className="border-b border-border pb-5">
              <h4 className="font-bold text-sm sm:text-base">{q}</h4>
              <p className="mt-2 text-sm text-muted-foreground leading-7">{a}</p>
            </div>
          ))}
        </div>
      </section>


      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-3">100 BMI Questions: Beginner to Advanced</h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">
          Explore common BMI questions in a learning sequence, from basic definitions and calculations through age, demographics, limitations, health implications, weight-management use, and clinical applications.
        </p>
        <div className="space-y-3">
          {bmiQuestions.map(({ number, category, question, answer }) => (
            <details key={number} className="border border-border bg-card p-4">
              <summary className="cursor-pointer font-bold text-sm sm:text-base">
                <span className="text-muted-foreground mr-2">{number}.</span>{question}
              </summary>
              <p className="mt-3 text-sm text-muted-foreground leading-7">{answer}</p>
              <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{category}</div>
            </details>
          ))}
        </div>
      </section>

      <section>
        <h3 className="font-display text-2xl uppercase tracking-tight mb-3">Scientific and Official References</h3>
        <ul className="space-y-3 text-sm text-muted-foreground leading-7">
          <li><a className="underline underline-offset-4 hover:text-foreground" href="https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html" target="_blank" rel="noreferrer">CDC — Adult BMI Categories</a></li>
          <li><a className="underline underline-offset-4 hover:text-foreground" href="https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight" target="_blank" rel="noreferrer">World Health Organization — Obesity and Overweight</a></li>
          <li><a className="underline underline-offset-4 hover:text-foreground" href="https://www.nhlbi.nih.gov/health/educational/lose_wt/risk.htm" target="_blank" rel="noreferrer">NHLBI — Assessing Your Weight and Health Risk</a></li>
        </ul>
      </section>

      <section className="border border-border p-6 bg-card">
        <h3 className="font-display text-xl uppercase tracking-tight mb-3">Medical Disclaimer</h3>
        <p className="text-sm text-muted-foreground leading-7">
          FitMe Pro calculators provide estimates for educational and informational purposes. They are not intended to diagnose, treat, cure, or prevent disease and do not replace professional medical assessment. BMI is a screening measure rather than a diagnosis. If you have a health concern or are using a result to make a medical decision, consult a qualified healthcare professional.
        </p>
      </section>
    </article>
  );
}
