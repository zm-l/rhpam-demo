package com.example.demo;

import org.kie.server.client.KieServicesClient;
import org.kie.server.client.KieServicesConfiguration;
import org.kie.server.client.KieServicesFactory;
import org.kie.server.client.ProcessServicesClient;
import org.kie.server.client.credentials.EnteredCredentialsProvider;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.ui.Model;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

// Jakarta EE packages
import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.JAXBException;
import jakarta.xml.bind.Marshaller;

@SpringBootApplication
@Controller
public class DemoApplication {

    private static final String KIE_SERVER_URL = "http://localhost:8080/kie-server/services/rest/server";
    private static final String CONTAINER_ID = "Job-Portal_1.0.0-SNAPSHOT";
    private static final String PROCESS_ID = "Job-Portal.hiring";
    private static final String USERNAME = "wbadmin";
    private static final String PASSWORD = "wbadmin";

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @GetMapping("/form")
    public String showForm() {
        return "form";
    }

    @PostMapping("/start-process")
    public String startProcess(@RequestParam Map<String, String> formData, Model model) {
        // Get the input data from the form submission
        String name = formData.get("name");
        String email = formData.get("email");
        String gender = formData.get("gender");
        float gpa = Float.parseFloat(formData.get("gpa"));
        String university = formData.get("university");
        String dob = formData.get("dob");
        String position = formData.get("position");

        // Create a Candidate object with the input data
        Candidate candidate = new Candidate(name, email, gender, gpa, university, dob);

        // Call the method in Main.java to start the process
        Long processInstanceId = startProcessWithInputData(candidate, position);

        // Pass the process instance ID to the view
        model.addAttribute("processInstanceId", processInstanceId);

        return "process-started";
    }

    private Long startProcessWithInputData(Candidate candidate, String position) {
        Map<String, Object> inputData = new HashMap<>();
        inputData.put("candidate", candidate);
        inputData.put("position", position);

        // Configure KIE Services Client
        KieServicesConfiguration kieServicesConfig = KieServicesFactory.newRestConfiguration(KIE_SERVER_URL,
                new EnteredCredentialsProvider(USERNAME, PASSWORD));
        Set<Class<?>> extraClasses = new HashSet<>();
        extraClasses.add(Candidate.class);
        kieServicesConfig.addExtraClasses(extraClasses);
        KieServicesClient kieServicesClient = KieServicesFactory.newKieServicesClient(kieServicesConfig);

        // Get the ProcessServicesClient
        ProcessServicesClient processServicesClient = kieServicesClient.getServicesClient(ProcessServicesClient.class);

        // Start the process and obtain the process instance ID
        Long processInstanceId = processServicesClient.startProcess(CONTAINER_ID, PROCESS_ID, inputData);

        return processInstanceId;
    }

}