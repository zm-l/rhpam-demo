package com.myspace.job_portal;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.kie.server.api.model.instance.TaskSummary;
import org.kie.server.client.KieServicesClient;
import org.kie.server.client.KieServicesConfiguration;
import org.kie.server.client.KieServicesFactory;
import org.kie.server.client.ProcessServicesClient;
import org.kie.server.client.UserTaskServicesClient;
import org.kie.server.client.credentials.EnteredCredentialsProvider;

public class Main {
    //Kie-server URL
    private static final String KIE_SERVER_URL = "http://localhost:8080/kie-server/services/rest/server";
    private static final String CONTAINER_ID = "Job-Portal_1.0.0-SNAPSHOT";
    private static final String PROCESS_ID = "Job-Portal.hiring";
    //PAM username
    private static final String USERNAME = "wbadmin";
    //PAM password
    private static final String PASSWORD = "wbadmin";
    public static void main(String[] args) {
        KieServicesConfiguration kieServicesConfig = 
                KieServicesFactory.newRestConfiguration(KIE_SERVER_URL,
                                new EnteredCredentialsProvider(USERNAME, PASSWORD));

        Set<Class<?>> extraClasses = new HashSet<>();
        extraClasses.add(Candidate.class);
        kieServicesConfig.addExtraClasses(extraClasses);

        KieServicesClient kieServicesClient = 
                        KieServicesFactory.newKieServicesClient(kieServicesConfig);

        ProcessServicesClient processServicesClient =
                kieServicesClient.getServicesClient(ProcessServicesClient.class);
        
        UserTaskServicesClient taskServicesClient =
            kieServicesClient.getServicesClient(UserTaskServicesClient.class);
        

        // Start process
        Map<String, Object> inputData = new HashMap<>();

        Candidate candidate = new Candidate();
        candidate.setName("Katy");
        candidate.setEmail("example@gmail.com");
        candidate.setGender("female");
        candidate.setGpa((float) 4.0);
        candidate.setUniversity("um");
        candidate.setDob("2000-01-01");
        inputData.put("candidate", candidate);
        inputData.put("position", "technology");

        Long processInstanceId = 
                processServicesClient.startProcess(CONTAINER_ID, PROCESS_ID, inputData);

        System.out.println(
            "New 'hiring' process instance started with instance-id: " + processInstanceId);

        // Get task list for the user "wbadmin"
        List<TaskSummary> tasks =
            taskServicesClient.findTasksAssignedAsPotentialOwner(USERNAME, 0, 10);

        for (int i=0; i < tasks.size(); i++) {
            TaskSummary ts = (TaskSummary)tasks.get(i);
            System.out.println("ID:" + ts.getId() + " status:" + ts.getStatus());
        }
    
        //Complete task instance

        // Change taskId to the task id for the job you want to complete
        // long taskId = 7; 
        // inputData = new HashMap<>();

        // Change the inputData to the inputData required to complete the task
        // inputData.put("approved", false);
        // taskServicesClient.completeAutoProgress(CONTAINER_ID, taskId, USERNAME, inputData);  
    }
}