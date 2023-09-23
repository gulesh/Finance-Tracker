package com.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.entities.Transfer;
import com.services.TransferService;

@RestController
@RequestMapping("/transfers")
public class TransferController {
    //inject transfer service here
    private final TransferService transferService;
    private static final Logger logger = LoggerFactory.getLogger(TransferController.class);

    @Autowired
    public TransferController(TransferService transferservice)
    {
        this.transferService = transferservice;
    }

    //get all the expenses
    @GetMapping("/")
    public ResponseEntity<List<Transfer>> showAllTransfers()
    {
        logger.info("Fetching all the transfers");
        List<Transfer> transfers = this.transferService.getAllTransfers();
        return ResponseEntity.ok(transfers);   
    }

    //add a new Transfer
    @PostMapping("/")
    public ResponseEntity<Transfer> addNewTransfer(@RequestBody Transfer transfer)
    {
        logger.info("Adding a new transfer");
        Transfer newTransfer = this.transferService.addNewTransfer(transfer);
        return ResponseEntity.ok(newTransfer);        
    }
    
}
