{"id":"ac4dcffb-ccbd-4e34-ab3e-799da3735179","name":"initialScreening-taskform.frm","model":{"taskName":"initialScreening","processId":"Job-Portal.hiring","properties":[{"name":"candidate","typeInfo":{"type":"OBJECT","className":"com.myspace.job_portal.Candidate","multiple":false},"metaData":{"entries":[{"name":"field-readOnly","value":true}]}},{"name":"interview","typeInfo":{"type":"OBJECT","className":"com.myspace.job_portal.Interview","multiple":false},"metaData":{"entries":[{"name":"field-readOnly","value":true}]}},{"name":"passedInitialScreening","typeInfo":{"type":"BASE","className":"java.lang.Boolean","multiple":false},"metaData":{"entries":[]}}],"formModelType":"org.kie.workbench.common.forms.jbpm.model.authoring.task.TaskFormModel"},"fields":[{"nestedForm":"0386f823-a6d4-4272-8cd1-1fa14bf76b8a","container":"FIELD_SET","id":"field_001828341155654E11","name":"candidate","label":"Candidate","required":false,"readOnly":true,"validateOnChange":true,"binding":"candidate","standaloneClassName":"com.myspace.job_portal.Candidate","code":"SubForm","serializedFieldClassName":"org.kie.workbench.common.forms.fields.shared.fieldTypes.relations.subForm.definition.SubFormFieldDefinition"},{"nestedForm":"193cf8ac-3759-4e6b-a651-f0fe657b7ef3","container":"FIELD_SET","id":"field_4033071757685525E12","name":"interview","label":"Interview","required":false,"readOnly":true,"validateOnChange":true,"binding":"interview","standaloneClassName":"com.myspace.job_portal.Interview","code":"SubForm","serializedFieldClassName":"org.kie.workbench.common.forms.fields.shared.fieldTypes.relations.subForm.definition.SubFormFieldDefinition"},{"id":"field_492167341753089E12","name":"passedInitialScreening","label":"PassedInitialScreening","required":false,"readOnly":false,"validateOnChange":true,"binding":"passedInitialScreening","standaloneClassName":"java.lang.Boolean","code":"CheckBox","serializedFieldClassName":"org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.checkBox.definition.CheckBoxFieldDefinition"}],"layoutTemplate":{"version":3,"style":"FLUID","layoutProperties":{},"rows":[{"properties":{},"layoutColumns":[{"span":"12","height":"12","properties":{},"rows":[],"layoutComponents":[{"dragTypeName":"org.uberfire.ext.plugin.client.perspective.editor.layout.editor.HTMLLayoutDragComponent","properties":{"HTML_CODE":"\u003ch3\u003eInputs:\u003c/h3\u003e"},"parts":[]}]}]},{"properties":{},"layoutColumns":[{"span":"12","height":"12","properties":{},"rows":[],"layoutComponents":[{"dragTypeName":"org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent","properties":{"field_id":"field_001828341155654E11","form_id":"ac4dcffb-ccbd-4e34-ab3e-799da3735179"},"parts":[]}]}]},{"properties":{},"layoutColumns":[{"span":"12","height":"12","properties":{},"rows":[],"layoutComponents":[{"dragTypeName":"org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent","properties":{"field_id":"field_4033071757685525E12","form_id":"ac4dcffb-ccbd-4e34-ab3e-799da3735179"},"parts":[]}]}]},{"properties":{},"layoutColumns":[{"span":"12","height":"12","properties":{},"rows":[],"layoutComponents":[{"dragTypeName":"org.uberfire.ext.plugin.client.perspective.editor.layout.editor.HTMLLayoutDragComponent","properties":{"HTML_CODE":"\u003ch3\u003eOutputs:\u003c/h3\u003e"},"parts":[]}]}]},{"properties":{},"layoutColumns":[{"span":"12","height":"12","properties":{},"rows":[],"layoutComponents":[{"dragTypeName":"org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent","properties":{"field_id":"field_492167341753089E12","form_id":"ac4dcffb-ccbd-4e34-ab3e-799da3735179"},"parts":[]}]}]}]}}