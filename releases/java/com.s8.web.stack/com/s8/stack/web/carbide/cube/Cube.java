package com.s8.stack.web.carbide.cube;

import com.s8.io.bohr.neon.core.NeBranch;
import com.s8.io.bohr.neon.core.NeObject;

/**
 * 
 * @author pierreconvert
 *
 */
public class Cube extends NeObject {
	
	
	public final static int NB_LAYERS = 8;
	
	
	/**
	 * 
	 * @param branch
	 */
	public Cube(NeBranch branch) {
		super(branch, "/s8-stack-web/carbide/cube/Cube");
	}


	
	/**
	 * 
	 * @param i
	 * @return
	 */
	public CubeElement getLayer(int i) {
		return (CubeElement) vertex.getObjList("elements").get(i);
	}
	
	
	
	public void addElement(CubeElement element) {
		vertex.addObjToList("elements", element);
	}



	
	/*
	public class PrimaryView extends S8View {

		public @Override String getJSClasspath() { return "/carbide/cube/Cube"; }

		public PrimaryView(S8Orbital orbital) throws S8Exception {
			super(orbital);
		}

		@Override
		public void render(S8Scope scope) throws IOException {
			CubeLevel.View[] layerViews = new CubeLevel.View[NB_LAYERS];
			for(int i=0; i<NB_LAYERS; i++) {
				layerViews[i] = layers[i].new View(scope.context.orbit(null));
			}
			orbital.setViews(0x02, layerViews);
			
			
			// dock
			Dock dock = new Dock();
			dock.initialize();
			S8View dockView = dock.new DockMainView(scope.context.orbit(null));
			layerViews[NB_LAYERS-1].content = dockView;
			
			
			S8View fullScreen3d = new NbFullScreenWindow(scope.context.orbit(null));
			layerViews[0].content = fullScreen3d;
			
			// 3D-layer
			
			
			
		}

		@Override
		public void react(int code, S8Scope scope) throws IOException {
			// TODO Auto-generated method stub
			
		}
	}
	*/
}
