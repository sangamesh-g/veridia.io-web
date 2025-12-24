from rest_framework.renderers import JSONRenderer


class EnvelopeJSONRenderer(JSONRenderer):
    """
    Wrap API responses in a consistent envelope: {"success": True/False, "data": ...}
    Useful when aligning success/error shapes across the API.
    """

    def render(self, data, accepted_media_type=None, renderer_context=None):
        # When used globally, ensure view code returns dicts compatible with this pattern.
        if renderer_context and renderer_context.get("response"):
            status_code = renderer_context["response"].status_code
            is_success = 200 <= status_code < 400
            wrapped = {"success": is_success, "data": data}
            return super().render(wrapped, accepted_media_type, renderer_context)
        return super().render(data, accepted_media_type, renderer_context)
