variable "name" { type = string }
variable "environment" { type = string }
variable "api_domain_name" { type = string; default = "" }
variable "tags" { type = map(string); default = {} }
