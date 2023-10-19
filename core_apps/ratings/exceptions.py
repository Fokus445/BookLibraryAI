from rest_framework.exceptions import APIException


class YouhaveAlreadyRated(APIException):
    status_code = 400
    default_detail = "have already rated this book"
    default_code = "bad_request"
