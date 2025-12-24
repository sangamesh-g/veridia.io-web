from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination, CursorPagination


class DefaultPageNumberPagination(PageNumberPagination):
    # Page size for list endpoints; overridable via ?page_size= and per-view
    page_size = 20
    page_size_query_param = "page_size"
    max_page_size = 100


class DefaultLimitOffsetPagination(LimitOffsetPagination):
    # Alternative style: limit/offset
    default_limit = 20
    max_limit = 200


class DefaultCursorPagination(CursorPagination):
    # For large datasets; stable ordering recommended on indexed fields
    page_size = 20
    ordering = "-id"
