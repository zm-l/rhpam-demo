{"id":"972e32f2-761f-4716-9837-c7ab27d449ea","name":"technicalInterview-taskform.frm","model":{"taskName":"technicalInterview","processId":"Job-Portal.hiring","properties":[{"name":"candidate","typeInfo":{"type":"OBJECT","className":"com.myspace.job_portal.Candidate","multiple":false},"metaData":{"entries":[{"name":"field-readOnly","value":true}]}},{"name":"passedTechnicalInterview","typeInfo":{"type":"BASE","className":"java.lang.Boolean","multiple":false},"metaData":{"entries":[]}}],"formModelType":"org.kie.workbench.common.forms.jbpm.model.authoring.task.TaskFormModel"},"fields":[{"nestedForm":"0386f823-a6d4-4272-8cd1-1fa14bf76b8a","container":"FIELD_SET","id":"field_073712266811605E12","name":"candidate","label":"Candidate","required":false,"readOnly":true,"validateOnChange":true,"binding":"candidate","standaloneClassName":"com.myspace.job_portal.Candidate","code":"SubForm","serializedFieldClassName":"org.kie.workbench.common.forms.fields.shared.fieldTypes.relations.subForm.definition.SubFormFieldDefinition"},{"id":"field_355603873656797E12","name":"passedTechnicalInterview","label":"PassedTechnicalInterview","required":false,"readOnly":false,"validateOnChange":true,"binding":"passedTechnicalInterview","standaloneClassName":"java.lang.Boolean","code":"CheckBox","serializedFieldClassName":"org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.checkBox.definition.CheckBoxFieldDefinition"}],"layoutTemplate":{"version":3,"style":"FLUID","layoutProperties":{},"rows":[{"properties":{},"layoutColumns":[{"span":"12","height":"12","properties":{},"rows":[],"layoutComponents":[{"dragTypeName":"org.uberfire.ext.plugin.client.perspective.editor.layout.editor.HTMLLayoutDragComponent","properties":{"HTML_CODE":"\u003ch3\u003eInputs:\u003c/h3\u003e"},"parts":[]}]}]},{"properties":{},"layoutColumns":[{"span":"12","height":"12","properties":{},"rows":[],"layoutComponents":[{"dragTypeName":"org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent","properties":{"field_id":"field_073712266811605E12","form_id":"972e32f2-761f-4716-9837-c7ab27d449ea"},"parts":[]}]}]},{"properties":{},"layoutColumns":[{"span":"12","height":"12","properties":{},"rows":[],"layoutComponents":[{"dragTypeName":"org.uberfire.ext.plugin.client.perspective.editor.layout.editor.HTMLLayoutDragComponent","properties":{"HTML_CODE":"\u003ch3\u003eOutputs:\u003c/h3\u003e"},"parts":[]}]}]},{"properties":{},"layoutColumns":[{"span":"12","height":"12","properties":{},"rows":[],"layoutComponents":[{"dragTypeName":"org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent","properties":{"field_id":"field_355603873656797E12","form_id":"972e32f2-761f-4716-9837-c7ab27d449ea"},"parts":[]}]}]}]}}