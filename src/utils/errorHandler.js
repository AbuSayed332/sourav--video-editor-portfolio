// Error handler for NestJS API responses
export const handleApiError = (error, response = null) => {
  // Log a concise error message instead of the whole object, which can be large.
  if (error && process.env.NODE_ENV === 'development') {
    console.error('API Error:', error);
  }

  // Prioritize error.response if it exists (like in axios errors)
  const res = error?.response || response;

  // If we have a response object, try to extract a specific message
  if (res?.data) {
    const errorData = res.data;

    // NestJS validation errors (class-validator)
    if (errorData.message && Array.isArray(errorData.message)) {
      return formatValidationErrors(errorData.message).join(', ');
    }

    // NestJS single error message
    if (errorData.message && typeof errorData.message === 'string') {
      return errorData.message;
    }

    // NestJS error object
    if (errorData.error) {
      return errorData.error;
    }
  }

  // Standard error messages
  if (error?.message) {
    return error.message;
  }

  // Default fallback
  return 'An unexpected error occurred. Please try again.'
}

// HTTP status code handlers
export const getErrorMessageByStatus = (status, defaultMessage = 'An error occurred') => {
  const statusMessages = {
    400: 'Bad request. Please check your input.',
    401: 'Unauthorized. Please login again.',
    403: 'Forbidden. You don\'t have permission to perform this action.',
    404: 'Resource not found.',
    409: 'Conflict. This resource already exists.',
    422: 'Validation failed. Please check your input.',
    429: 'Too many requests. Please try again later.',
    500: 'Server error. Please try again later.',
    502: 'Bad gateway. Server is temporarily unavailable.',
    503: 'Service unavailable. Please try again later.'
  }

  return statusMessages[status] || defaultMessage
}

// Validation error formatter for NestJS class-validator
export const formatValidationErrors = (errors) => {
  if (!errors || !Array.isArray(errors)) return []

  return errors.map(error => {
    if (typeof error === 'string') return error
    if (error.constraints) {
      return Object.values(error.constraints).join(', ')
    }
    return error.message || 'Validation error'
  })
}

// API response validator
export const isApiResponse = (data) => {
  return data && typeof data === 'object' && 
    (data.hasOwnProperty('statusCode') || data.hasOwnProperty('message') || data.hasOwnProperty('error'))
}

// Success message handler
export const getSuccessMessage = (action, resource = 'item') => {
  const actions = {
    create: `${resource} created successfully`,
    update: `${resource} updated successfully`, 
    delete: `${resource} deleted successfully`,
    login: 'Login successful',
    logout: 'Logout successful',
    register: 'Registration successful'
  }

  return actions[action] || 'Operation completed successfully'
}