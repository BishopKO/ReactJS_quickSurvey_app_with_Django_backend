from django.test import TestCase
import json
from surveys_app.utils.prepareResults import prepare_results
from surveys_app.models import Survey, Answers
from django.contrib.auth.models import User

question_data = json.dumps([
    {"question": "This is question number one.", "answers": "Answer one.\nAnswer two\nAnswer three.", "type": "single"},
    {"question": "This is question number two.", "answers": "Answer a\nAnswer b\nAnswer c", "type": "multi"},
    {"question": "This is question number three."}])

test_answers = [{'data': '{"0": 1, "1": [false, true, true], "2": "answer"}'}]


class TestCreateResults(TestCase):
    def setUp(self) -> None:
        self.user = User.objects.create(username='test_user', password='test_password')
        self.survey = Survey.objects.create(owner=self.user, data=json.dumps(question_data))
        self.answer = Answers.objects.create(survey_id=self.survey, data=test_answers)

    def test_prepare_results(self):
        result = prepare_results(question_data, test_answers)
        [print(x) for x in result]
