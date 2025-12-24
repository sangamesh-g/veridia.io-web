from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    """
    Production-friendly exception wrapper.
    - Keeps DRF defaults but wraps payload into a consistent envelope.
    - Add logging here (e.g., Sentry) if needed.
    """
    response = exception_handler(exc, context)
    if response is None:
        return response
    response.data = {
        "success": False,
        "error": {
            "type": exc.__class__.__name__,
            "detail": response.data,
        },
    }
    return response
