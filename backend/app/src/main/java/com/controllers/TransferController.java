package com.controllers;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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
    //delete a transfer
    @DeleteMapping("/{transferId}")
    public ResponseEntity<String> deleteTransfer(@PathVariable("transferId") String transferId)
    {
        boolean deletionSuccessful = this.transferService.deleteTransfer(transferId);
        logger.info("Deletion of transfer is complete : " + deletionSuccessful);
        if(deletionSuccessful)
        {
            return ResponseEntity.ok("Transfer was successfully deleted!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Transfer could not found");

    }

    @PatchMapping("/{transferId}")
    public ResponseEntity<Transfer> editTransfer(@PathVariable("transferId") String id , @RequestBody Map<String, Object> attributes )
    {
        try
        {
            Transfer updatedTransfer = this.transferService.editTransfer(id, attributes);
            logger.info("Transfer edited successfully! ");
            return ResponseEntity.ok(updatedTransfer);
        }
        catch(Exception e)
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error when updating the transfer: ", e);
        }

    }
    
}
