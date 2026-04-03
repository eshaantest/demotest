variable "name" { type = string }
variable "environment" { type = string }
variable "vpc_id" { type = string }
variable "private_subnet_ids" { type = list(string) }
variable "allowed_security_group_ids" { type = list(string) }
variable "database_name" { type = string; default = "mesrai_demo" }
variable "master_username" { type = string; default = "dbadmin" }
variable "instance_count" { type = number; default = 1 }
variable "min_acu" { type = number; default = 0.5 }
variable "max_acu" { type = number; default = 4 }
variable "tags" { type = map(string); default = {} }
