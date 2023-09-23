package com.exceptionhandler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class Controller {
    
    @ResponseBody
    @ExceptionHandler(UserNotFound.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String userNotFoundHandler(UserNotFound usr)
    {
        return usr.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(DuplicateUser.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    String duplicateUserHandler(DuplicateUser usr)
    {
        return usr.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(DuplicateAccount.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    String duplicateAccountHandler(DuplicateAccount acct)
    {
        return acct.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(AccountNotFound.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String accountNotFoundHandler(AccountNotFound acctNotFound)
    {
        return acctNotFound.getMessage();
    }
}
