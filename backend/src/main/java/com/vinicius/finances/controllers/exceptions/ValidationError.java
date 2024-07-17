package com.vinicius.finances.controllers.exceptions;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class ValidationError extends StandardError {

    private List<FieldError> errors = new ArrayList<>();

}
