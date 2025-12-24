from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAuthorOrReadOnly(BasePermission):
    """
    Read-only for everyone; write only allowed to the resource owner/author.
    Use object-level permission checks in ViewSets.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        # Adjust attribute name if your model differs (e.g., owner_id)
        return getattr(obj, "author_id", None) == getattr(request.user, "id", None)
