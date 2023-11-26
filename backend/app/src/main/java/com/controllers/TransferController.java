package com.controllers;

import java.util.List;
import java.util.Map;
import java.net.URLDecoder;
import java.io.UnsupportedEncodingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    @PreAuthorize("@authUtils.isCurrentUser(#encodedUserId)")
    public ResponseEntity<List<Transfer>> showAllTransfers(@RequestParam("userId") String encodedUserId)
    {
        try
        {
            String decodedUserId = URLDecoder.decode(encodedUserId, "UTF-8");
            logger.info("currUserIdDecoded: " + decodedUserId);
            logger.info("Fetching all the transfers");
            List<Transfer> transfers = this.transferService.getCurrrentMonthActiveTransfersForTheUser(decodedUserId);
            return ResponseEntity.ok(transfers);  
        }
        catch (UnsupportedEncodingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
         
    }

    //add a new Transfer
    @PostMapping("/")
    @PreAuthorize("@authUtils.isCurrentUser(#encodedUserId)")
    public ResponseEntity<Transfer> addNewTransfer(@RequestBody Transfer transfer,
            @RequestParam("userId") String encodedUserId)
    {
        try
        {
            String decodedUserId = URLDecoder.decode(encodedUserId, "UTF-8");
            logger.info("currUserIdDecoded: " + decodedUserId);
            logger.info("Adding a new transfer");
            Transfer newTransfer = this.transferService.addNewTransfer(transfer, decodedUserId);
            return ResponseEntity.ok(newTransfer); 
        }
        catch (UnsupportedEncodingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
               
    }
    //delete a transfer
    @DeleteMapping("/{transferId}")
    public ResponseEntity<String> deleteTransfer(@PathVariable("transferId") String transferId, @RequestParam("userId") String encodedUserId)
    {
        try
        {
            String decodedUserId = URLDecoder.decode(encodedUserId, "UTF-8");
            logger.info("currUserIdDecoded: " + decodedUserId);
            boolean deletionSuccessful = this.transferService.deleteTransfer(transferId, decodedUserId);
            if(deletionSuccessful)
            {
                logger.info("Deletion of transfer is complete : " + deletionSuccessful);
                return ResponseEntity.ok("Transfer was successfully deleted!");
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Transfer could not found");
        }
        catch(Exception e)
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error deleting trasnfer: ", e);
        }
        
    }

    @PatchMapping("/{transferId}")
    @PreAuthorize("@authUtils.isCurrentUser(#encodedUserId)")
    public ResponseEntity<Transfer> editTransfer(@PathVariable("transferId") String id , @RequestBody Map<String, Object> attributes, @RequestParam("userId") String encodedUserId )
    {
        try
        {
            String decodedUserId = URLDecoder.decode(encodedUserId, "UTF-8");
            logger.info("currUserIdDecoded: " + decodedUserId);
            Transfer updatedTransfer = this.transferService.editTransfer(id, attributes, decodedUserId);
            logger.info("Transfer edited successfully! ");
            return ResponseEntity.ok(updatedTransfer);
        }
        catch(Exception e)
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error when updating the transfer: ", e);
        }

    }
    
}
