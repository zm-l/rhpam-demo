{"id":"a9f2bfe2-ac4d-436e-943a-7282c2aa33f0","name":"initialScreening-taskform.frm","model":{"taskName":"initialScreening","processId":"Job-Portal.hiring","properties":[{"name":"candidate","typeInfo":{"type":"OBJECT","className":"com.myspace.job_portal.Candidate","multiple":false},"metaData":{"entries":[{"name":"field-readOnly","value":true}]}},{"name":"interview","typeInfo":{"type":"OBJECT","className":"com.myspace.job_portal.Interview","multiple":false},"metaData":{"entries":[{"name":"field-readOnly","value":true}]}},{"name":"passedInitialScreening","typeInfo":{"type":"BASE","className":"java.lang.Boolean","multiple":false},"metaData":{"entries":[]}}],"formModelType":"org.kie.workbench.common.forms.jbpm.model.authoring.task.TaskFormModel"},"fields":[{"nestedForm":"8cc844f4-3711-4c92-86d1-c5c6abc195e5","container":"FIELD_SET","id":"field_027393338560749E11","name":"candidate","label":"Candidate","required":false,"readOnly":true,"validateOnChange":true,"binding":"candidate","standaloneClassName":"com.myspace.job_portal.Candidate","code":"SubForm","serializedFieldClassName":"org.kie.workbench.common.forms.fields.shared.fieldTypes.relations.subForm.definition.SubFormFieldDefinition"},{"nestedForm":"f85f8a7c-5299-4b50-840a-b7c47618d18a","container":"FIELD_SET","id":"field_605100337883561E12","name":"interview","label":"Interview","required":false,"readOnly":true,"validateOnChange":true,"binding":"interview","standaloneClassName":"com.myspace.job_portal.Interview","code":"SubForm","serializedFieldClassName":"org.kie.workbench.common.forms.fields.shared.fieldTypes.relations.subForm.definition.SubFormFieldDefinition"},{"id":"field_818251995750446E11","name":"passedInitialScreening","label":"PassedInitialScreening","required":false,"readOnly":false,"validateOnChange":true,"binding":"passedInitialScreening","standaloneClassName":"java.lang.Boolean","code":"CheckBox","serializedFieldClassName":"org.kie.workbench.common.forms.fields.shared.fieldTypes.basic.checkBox.definition.CheckBoxFieldDefinition"}],"layoutTemplate":{"version":3,"style":"FLUID","layoutProperties":{},"rows":[{"properties":{},"layoutColumns":[{"span":"12","height":"12","properties":{},"rows":[],"layoutComponents":[{"dragTypeName":"org.uberfire.ext.plugin.client.perspective.editor.layout.editor.HTMLLayoutDragComponent","properties":{"HTML_CODE":"\u003ch3\u003eInputs:\u003c/h3\u003e"},"parts":[]}]}]},{"properties":{},"layoutColumns":[{"span":"12","height":"12","properties":{},"rows":[],"layoutComponents":[{"dragTypeName":"org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent","properties":{"field_id":"field_027393338560749E11","form_id":"a9f2bfe2-ac4d-436e-943a-7282c2aa33f0"},"parts":[]}]}]},{"properties":{},"layoutColumns":[{"span":"12","height":"12","properties":{},"rows":[],"layoutComponents":[{"dragTypeName":"org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent","properties":{"field_id":"field_605100337883561E12","form_id":"a9f2bfe2-ac4d-436e-943a-7282c2aa33f0"},"parts":[]}]}]},{"properties":{},"layoutColumns":[{"span":"12","height":"12","properties":{},"rows":[],"layoutComponents":[{"dragTypeName":"org.uberfire.ext.plugin.client.perspective.editor.layout.editor.HTMLLayoutDragComponent","properties":{"HTML_CODE":"\u003ch3\u003eOutputs:\u003c/h3\u003e"},"parts":[]}]}]},{"properties":{},"layoutColumns":[{"span":"12","height":"12","properties":{},"rows":[],"layoutComponents":[{"dragTypeName":"org.kie.workbench.common.forms.editor.client.editor.rendering.EditorFieldLayoutComponent","properties":{"field_id":"field_818251995750446E11","form_id":"a9f2bfe2-ac4d-436e-943a-7282c2aa33f0"},"parts":[]}]}]}]}}