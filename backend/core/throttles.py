from rest_framework.throttling import ScopedRateThrottle


class UploadsBurstThrottle(ScopedRateThrottle):
    # Throttle scope name; set rate in REST_FRAMEWORK['DEFAULT_THROTTLE_RATES']['uploads']
    scope = "uploads"
