from django.db import IntegrityError, DatabaseError
from django.http import JsonResponse


class ExceptionCatchAndJsonResponseMixin:
    @staticmethod
    def return_exception(exception):
        print(exception)
        if isinstance(exception, IntegrityError):
            return JsonResponse({'registration': 'INTEGRITY_ERROR'})
        elif isinstance(exception, DatabaseError):
            return JsonResponse({'registration': 'DATABASE_ERROR'})
