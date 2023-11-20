package com.s8.pkgs.ui.carbide.objform;

import com.s8.api.objects.web.S8WebFront;
import com.s8.pkgs.ui.carbide.Carbide;

public class MethodObjFormLauncher extends ObjFormElement {

	public MethodObjFormLauncher(S8WebFront branch) {
		super(branch, Carbide.ROOT_WEBPATH + "/objform/MethodObjFormLauncher");
	}
	
	public void setName(String name) {
		vertex.fields().setStringUTF8Field("name", name);
	}

}