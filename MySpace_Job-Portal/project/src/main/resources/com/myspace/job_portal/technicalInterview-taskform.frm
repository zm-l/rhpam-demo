{"id":"66b0c1b5-13a9-4c6a-8e53-cefd40d20554","name":"technicalInterview-taskform.frm","model":{"taskName":"technicalInterview","processId":"Job-Portal.hiring","properties":[{"name":"candidate","typeInfo":{"type":"OBJECT","className":"com.myspace.job_portal.Candidate","multiple":false},"metaData":{"entries":[{"name":"field-readOnly","value":true}]}},{"name":"passedTechnicalInterview","typeInfo":{"type":"BASE","className":"java.lang.Boolean","multiple":false},"metaData":{"entries":[]}}],"formModelType":"org.kie.workbench.common.forms.jbpm.model.authoring.task.TaskFormModel"},"fields":[{"nestedForm":"8cc844f4-3711-4c92-86d1-c5c6abc195e5","container":"FIELD_SET","id":"field_2864745919797177E11","name":"candidate","label":"Candidate","required":false,"readOnly":true,"validateOnChange":true,"binding":"candidate","standaloneClassName":"com.myspace.job_portal.Candidate","code":"SubForm","serializedFieldClassName":"org.kie.workbench.common.forms.fields.shared.fieldTypes.relations.subForm.definition.SubFormFieldDefinition"},{"id":"field_474478836508011E11","name":"passedTechnicalInterview","label":"PassedTechnicalInterview","required":false,"readOnly":false,"validateOnChange":true,"binding":"passedTechnicalInterview","standaloneClassName":"java.lang.Boolean","code":"CheckBox","serializedFieldClassName":"org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.checkBox.definition.CheckBoxFieldDefinition"}],"layoutTemplate":{"version":3,"style":"FLUID","layoutProperties":{},"rows":[{"properties":{},"layoutColumns":[{"span":"12","height":"12","properties":{},"rows":[],"layoutComponents":[{"dragTypeName":"org.uberfire.ext.plugin.client.perspective.editor.layout.editor.HTMLLayoutDragComponent","properties":{"HTML_CODE":"\u003ch3\u003eInputs:\u003c/h3\u003e"},"parts":[]}]}]},{"properties":{},"layoutColumns":[{"span":"12","height":"12","properties":{},"rows":[],"layoutComponents":[{"dragTypeName":"org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent","properties":{"field_id":"field_2864745919797177E11","form_id":"66b0c1b5-13a9-4c6a-8e53-cefd40d20554"},"parts":[]}]}]},{"properties":{},"layoutColumns":[{"span":"12","height":"12","properties":{},"rows":[],"layoutComponents":[{"dragTypeName":"org.uberfire.ext.plugin.client.perspective.editor.layout.editor.HTMLLayoutDragComponent","properties":{"HTML_CODE":"\u003ch3\u003eOutputs:\u003c/h3\u003e"},"parts":[]}]}]},{"properties":{},"layoutColumns":[{"span":"12","height":"12","properties":{},"rows":[],"layoutComponents":[{"dragTypeName":"org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent","properties":{"field_id":"field_474478836508011E11","form_id":"66b0c1b5-13a9-4c6a-8e53-cefd40d20554"},"parts":[]}]}]}]}}