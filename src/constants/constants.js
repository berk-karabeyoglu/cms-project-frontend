export const AUTH_CONSTANTS = {
    TOKEN_KEY:"access_token"
}

export const PATHS = {
    LOGIN : "/*",
    FORGOT_PASSWORD : "/forgot",
    RESET_PASSWORD : "/reset-password",
    ADMIN_DASHBOARD : "/dashboard"
}

export const API = {
    API_URL : "http://localhost:8000/api/v1"
}

export const PASSWORD_VALIDATION_CRITERIAS = {
    minchar : "Have to be at least 8 character",
    uppercase: "Have to at least 1 uppercase",
    lowercase: "Have to at least 1 lowercase",
    digit : "Have to at least 1 digit",
    specialChar : "Have to at least 1 special character"
}

export const FIELD_TYPES = {
    string: "Text (string)",
    decimal : "Number (decimal)",
    boolean : "Boolean",
    float:"Number (float)",
    integer : "Number (integer)",
    dateField : "Date Field",
    fileField : "File Field"
}