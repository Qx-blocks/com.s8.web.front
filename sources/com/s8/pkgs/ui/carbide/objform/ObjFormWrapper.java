package com.s8.pkgs.ui.carbide.objform;

import com.s8.api.objects.web.S8WebFront;
import com.s8.pkgs.ui.carbide.Carbide;
import com.s8.pkgs.ui.carbide.HTML_NeNode;


/**
 * 
 * @author pierreconvert
 *
 */
public class ObjFormWrapper extends HTML_NeNode {

	
	
	/**
	 * 
	 */
	public ObjFormWrapper(S8WebFront branch) {
		super(branch, Carbide.ROOT_WEBPATH + "/objform/ObjFormWrapper");
	}
	
	
	/**
	 * 
	 * @param element
	 */
	public void setRoot(ObjFormElement element) {
		vertex.fields().setObjectField("root", element);
	}
	
	
	
}