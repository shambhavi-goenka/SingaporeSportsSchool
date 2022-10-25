package com.example.demo.successloan;

import com.example.demo.users.Users;
import com.example.demo.users.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/successloan")
public class SuccessloanController {

    private final SuccessloanService successloanService;

    @Autowired
    public SuccessloanController(SuccessloanService successloanService) {
        this.successloanService = successloanService;
    }


    @GetMapping
    public List<Successloan> getUsers(){
        return successloanService.getSuccessloan();
    }

    @GetMapping(path = "/attraction/{id}")
    public List<Successloan> getSuccessloanByAttractionId(@PathVariable("id") Integer id){
        return successloanService.getSuccessloanByAttractionId(id);
    }

    @GetMapping(path = "/attraction/{id}/month/{month}/year/{year}")
    public List<Successloan> getSuccessloanByAttractionIdAndMonthAndYear(@PathVariable("id") Integer id, @PathVariable("month") String month, @PathVariable("year") String year){
        return successloanService.getSuccessloanByAttractionIdAndMonthAndYear(id, month, year);
    }

    @PostMapping
    public void registerNewSuccessloan(@RequestBody Successloan successloan) {
        successloanService.addNewSuccessloan(successloan);
    }

    @DeleteMapping(path = "{successloanId}")
    public void deleteSuccessloan(@PathVariable("successloanId") Integer successloanId) {
        successloanService.deleteSuccessloan(successloanId);
    }




}