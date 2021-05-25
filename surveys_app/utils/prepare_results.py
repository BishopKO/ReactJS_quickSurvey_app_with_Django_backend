import json


def prepare_text_results(questions_data, answers_data):
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


def create_chart_results_template(questions):
    results = {}
    indexes = []

    for number, question in enumerate(json.loads(questions)):
        tmp_results = {'question': question.get('question'), 'counter': None}
        if question.get('answers'):
            answers_qty = len(question.get('answers').split('\n'))
            tmp_results['counter'] = [0] * answers_qty
            results['question_' + str(number)] = tmp_results
            indexes.append(number)
    return results, indexes


def prepare_chart_results(questions_data, answers_data):
    answers_template, indexes = create_chart_results_template(questions_data)

    for answer in answers_data:
        answer = json.loads(answer.get('data'))

        for number in indexes:
            current_answer = answer.get(str(number))
            if isinstance(current_answer, int):
                tmp_counter = answers_template.get('question_' + str(number))['counter']
                tmp_counter[current_answer] += 1
                answers_template['question_' + str(number)]['counter'] = tmp_counter
            if isinstance(current_answer, list):
                tmp_counter = answers_template.get('question_' + str(number))['counter']
                for ans_number, ans in enumerate(current_answer):
                    if ans:
                        tmp_counter[ans_number] += 1
                answers_template['question_' + str(number)]['counter'] = tmp_counter

    answers_template['answers_qty'] = len(answers_data)
    return answers_template


# TODO: MOVE ALL FUNTIONALITY TO CLASS
class ChartResults:
    def __init__(self, questions_data, answers_data):
        self.questions_data = questions_data
        self.answers_data = answers_data
        self.template = None

    def create_chart_results_template(self):
        results = {}
        indexes = []

        for number, question in enumerate(json.loads(self.questions_data)):
            tmp_results = {'question': question.get('question'), 'counter': None}
            if question.get('answers'):
                answers_qty = len(question.get('answers').split('\n'))
                tmp_results['counter'] = [0] * answers_qty
                results['question_' + str(number)] = tmp_results
                indexes.append(number)
        return results, indexes

    def prepare_chart_results(self):
        answers_template, indexes = self.create_chart_results_template()

        for answer in self.answers_data:
            answer = json.loads(answer.get('data'))

            for number in indexes:
                current_answer = answer.get(str(number))
                if isinstance(current_answer, int):
                    tmp_counter = answers_template.get('question_' + str(number))['counter']
                    tmp_counter[current_answer] += 1
                    answers_template['question_' + str(number)]['counter'] = tmp_counter
                if isinstance(current_answer, list):
                    tmp_counter = answers_template.get('question_' + str(number))['counter']
                    for ans_number, ans in enumerate(current_answer):
                        if ans:
                            tmp_counter[ans_number] += 1
                    answers_template['question_' + str(number)]['counter'] = tmp_counter

        answers_template['answers_qty'] = len(self.answers_data)
        return answers_template
