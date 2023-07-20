package com.s8.web.front.carbide.grid;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.bohr.neon.core.NeObject;
import com.s8.io.bohr.neon.functions.none.VoidNeFunction;
import com.s8.io.bohr.neon.lambdas.none.VoidLambda;
import com.s8.web.front.carbide.popover.Popover;


/**
 * 
 * @author pierreconvert
 *
 */
public class GridCard extends NeObject {

	
	/**
	 * 
	 * @param branch
	 * @param typeName
	 */
	public GridCard(NeBranch branch, String typeName) {
		super(branch, typeName);
	}

	

	/**
	 * 
	 * @param name
	 */
	public void setSelected(boolean isSelected) {
		vertex.fields().setBool8Field("isSelected", isSelected);
	}
	
	
	public void clearPopover() {
		vertex.fields().setObjectField("popover", null);
	}
	
	/**
	 * 
	 * @param name
	 */
	public void setPopover(Popover popover) {
		vertex.fields().setObjectField("popover", popover);
	}
	

	
	
	/**
	 * 
	 * @param func
	 */
	public void onClick(VoidNeFunction func) {
		vertex.methods().setVoidMethod("on-click", func);
	}
	
	

	/**
	 * 
	 * @param func
	 */
	public void onClickLambda(VoidLambda lambda) {
		vertex.methods().setVoidMethodLambda("on-click", lambda);
	}
	
	
}
