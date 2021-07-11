import json


def prepare_text_results(questions_data, answers_queryset):
    survey_results = []
    tmp_answers = {}
    all_results = []

    for answers in answers_queryset:
        for number, answer in enumerate(json.loads(answers.data)):
            question, question_type = questions_data[number].get('question'), questions_data[number].get('type')
            tmp_answers['question'] = question

            if question_type == 'single':
                answers_list = questions_data[number].get('answers').split('\n')
                tmp_answers['answer'] = answers_list[int(answer)]

            elif question_type == 'multi':
                answers_list = questions_data[number].get('answers').split('\n')
                tmp_answers['answer'] = ''
                for num, ans in enumerate(answer):
                    if ans:
                        tmp_answers['answer'] += answers_list[num] + "\n"
            else:
                tmp_answers['answer'] = answer

            survey_results.append(tmp_answers)
            tmp_answers = {}
        all_results.append(survey_results)
        survey_results = []

    return all_results


def create_chart_results_template(questions_data):
    results = []
    indexes = []

    for number, question in enumerate(questions_data):
        if question.get('answers'):
            tmp_results = {'question': question.get('question'), 'answers': question.get('answers').split('\n'),
                           'counter': None, }
            answers_qty = len(question.get('answers').split('\n'))
            tmp_results['counter'] = [0] * answers_qty
            results.append(tmp_results)
            indexes.append(number)
    return results, indexes


def prepare_chart_results(questions_data, answers_queryset):
    answers_template, indexes = create_chart_results_template(questions_data)

    for answer in answers_queryset:
        answer = json.loads(answer.data)

        for i, index in enumerate(indexes):
            answer_value = answer[index]

            if isinstance(answer_value, int):
                tmp_counter = answers_template[i].get('counter')
                tmp_counter[answer_value] += 1
                answers_template[i]['counter'] = tmp_counter

            if isinstance(answer_value, list):
                tmp_counter = answers_template[i].get('counter')
                tmp_counter = [tmp_counter[ind] + int(val) for ind, val in enumerate(answer_value)]
                answers_template[i]['counter'] = tmp_counter
            
    return answers_template
