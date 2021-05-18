from django.db import IntegrityError, DatabaseError
from django.http import JsonResponse


# TODO: ADD MORE EXCEPTIONS
class ExceptionCatchAndJsonResponseMixin:
    @staticmethod
    def return_exception(exception):
        if isinstance(exception, IntegrityError):
            return JsonResponse({'error': 'INTEGRITY_ERROR'})
        elif isinstance(exception, DatabaseError):
            return JsonResponse({'error': 'DATABASE_ERROR'})
        else:
            return JsonResponse({'error': 'DATABASE_ERROR'})
