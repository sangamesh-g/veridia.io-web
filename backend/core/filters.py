import django_filters


class ApplicationFilter(django_filters.FilterSet):
    # Example FilterSet wiring for generic use; adjust fields in views
    status = django_filters.CharFilter(field_name="status", lookup_expr="exact")
    department = django_filters.CharFilter(field_name="department", lookup_expr="iexact")
    position = django_filters.CharFilter(field_name="position", lookup_expr="icontains")
    created_after = django_filters.IsoDateTimeFilter(field_name="applied_date", lookup_expr="gte")
    created_before = django_filters.IsoDateTimeFilter(field_name="applied_date", lookup_expr="lte")
