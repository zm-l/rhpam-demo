{"id":"193cf8ac-3759-4e6b-a651-f0fe657b7ef3","name":"com_myspace_job_portal_Interview","model":{"source":"INTERNAL","className":"com.myspace.job_portal.Interview","name":"Interview","properties":[{"name":"interviewer","typeInfo":{"type":"BASE","className":"java.lang.String","multiple":false},"metaData":{"entries":[{"name":"field-label","value":"Interviewer"},{"name":"field-placeHolder","value":"Interviewer"}]}},{"name":"interviewDateTime","typeInfo":{"type":"BASE","className":"java.time.LocalDateTime","multiple":false},"metaData":{"entries":[{"name":"field-label","value":"Interview Date and Time"},{"name":"field-placeHolder","value":"Interview Date and Time"}]}}],"formModelType":"org.kie.workbench.common.forms.data.modeller.model.DataObjectFormModel"},"fields":[{"maxLength":100,"placeHolder":"Interviewer","id":"field_5696510464372273E12","name":"interviewer","label":"Interviewer","required":false,"readOnly":false,"validateOnChange":true,"binding":"interviewer","standaloneClassName":"java.lang.String","code":"TextBox","serializedFieldClassName":"org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.textBox.definition.TextBoxFieldDefinition"},{"placeHolder":"Interview Date and Time","showTime":true,"id":"field_049572624308779E12","name":"interviewDateTime","label":"Interview Date and Time","required":false,"readOnly":false,"validateOnChange":true,"binding":"interviewDateTime","standaloneClassName":"java.time.LocalDateTime","code":"DatePicker","serializedFieldClassName":"org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.datePicker.definition.DatePickerFieldDefinition"}],"layoutTemplate":{"version":3,"style":"FLUID","layoutProperties":{},"rows":[{"properties":{},"layoutColumns":[{"span":"12","height":"12","properties":{},"rows":[],"layoutComponents":[{"dragTypeName":"org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent","properties":{"field_id":"field_5696510464372273E12","form_id":"193cf8ac-3759-4e6b-a651-f0fe657b7ef3"},"parts":[]}]}]},{"properties":{},"layoutColumns":[{"span":"12","height":"12","properties":{},"rows":[],"layoutComponents":[{"dragTypeName":"org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent","properties":{"field_id":"field_049572624308779E12","form_id":"193cf8ac-3759-4e6b-a651-f0fe657b7ef3"},"parts":[]}]}]}]}}