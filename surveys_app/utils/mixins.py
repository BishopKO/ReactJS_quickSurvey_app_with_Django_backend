from django.db import IntegrityError, DatabaseError
from django.http import JsonResponse


# TODO: ADD MORE EXCEPTIONS
class ExceptionCatchAndJsonResponseMixin:
    @staticmethod
    def return_exception(exception):
        if isinstance(exception, IntegrityError):
            return JsonResponse({'BACKEND_ERROR': 'INTEGRITY_ERROR'})
        elif isinstance(exception, DatabaseError):
            return JsonResponse({'BACKEND_ERROR': 'DATABASE_ERROR'})
        else:
            return JsonResponse({'BACKEND_ERROR': 'DATABASE_ERROR'})
