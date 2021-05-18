import json


def prepare_results(questions_data, answers_data):
    survey_results = []
    tmp_answers = {}
    questions_data = json.loads(questions_data)
    all_results = []

    for number, answer in enumerate(answers_data):
        for answer_number, answer_value in json.loads(answer.get('data')).items():
            answer_number = int(answer_number)
            question_value = questions_data[answer_number].get('question')
            question_type = questions_data[answer_number].get('type')
            tmp_answers['question'] = question_value
            if question_type == 'single':
                answer_value = int(answer_value)
                answers_choice = questions_data[answer_number].get('answers').split('\n')
                answer = answers_choice[answer_value]
                tmp_answers['answer'] = answer
            elif question_type == 'multi':
                answers_choice = questions_data[answer_number].get('answers').split('\n')
                tmp_answers['answer'] = ''
                for ind, ans in enumerate(answer_value):
                    if ans:
                        tmp_answers['answer'] += answers_choice[ind] + "\n"
            else:
                tmp_answers['answer'] = answer_value
            survey_results.append(tmp_answers)
            tmp_answers = {}
        all_results.append(survey_results)
        survey_results = []
    return all_results
