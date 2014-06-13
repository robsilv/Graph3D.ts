//var AxisComponent = GRAPH3D.namespace("GRAPH3D.common.ui.components").AxisComponent;
//var namespace = GRAPH3D.namespace("GRAPH3D.common.ui.components");
	
class YAxisComponent extends AxisComponent
{
	constructor(axisLength:number, defaultTextSize:number) {
        super(axisLength, defaultTextSize);
        //this._init(axisLength, defaultTextSize);
	}
	
    public static create(axisLength:number, defaultTextSize:number):YAxisComponent 
	{
		var newInstance = new YAxisComponent(axisLength, defaultTextSize);
		return newInstance;
	}
		
	//private _init(axisLength, defaultTextSize) 
	//{
	//	this._axisLength = axisLength;
	//	this._defaultTextSize = defaultTextSize;
	//}
		
	public destroy():void 
	{
        super.destroy();
	}
		
	// VALUES ==========================================
    // protected
    public _getAxisMarkerPos(step: number): THREE.Vector3
	{
		return new THREE.Vector3(0, step, 0 );
    }
    // protected
	public _getMarkerInitState(text:THREE.Object3D):any
    {
        var mesh: THREE.Mesh = <THREE.Mesh>text.children[0];
		var rightOffset = -1 * ( mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x );
    
        var state: Object = {
            position: new THREE.Vector3(rightOffset - 40, -this._defaultTextSize / 2, 0),
            rotation: new THREE.Vector3(0, 0, 0)
        }

		return state;
	}
	private _getMarkerBottomState(text:THREE.Object3D):any
    {
        var mesh: THREE.Mesh = <THREE.Mesh>text.children[0];
		var rightOffset = -1 * ( mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x );
    
        var state: Object = {
            position: new THREE.Vector3(rightOffset - 40, this._defaultTextSize / 2, 0),
            rotation: new THREE.Vector3(Math.PI, 0, 0)
        }; 

		return state;
	}
	// protected
	public _getMarkerInitAnimValues():any
	{
		var obj = { animLength: 150,
					animObj: { rX:Math.PI/2, opacity: 0, yAxisLength:0 },
					targObj: {rX: 0, opacity: 1, yAxisLength: -20} };
						
		return obj;
    }
    // protected
	public _getTitleInitState(text:THREE.Object3D):any
    {
        var mesh: THREE.Mesh = <THREE.Mesh>text.children[0];
		var centreOffset = -0.5 * ( mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x );
  
        var state = {
            position: new THREE.Vector3(-120, centreOffset + this._axisLength / 2, 0),
            rotation: new THREE.Vector3(0, 0, Math.PI / 2)
        };

		return state;
	}
	private _getTitleBottomState(text:THREE.Object3D):any
    {
        var mesh: THREE.Mesh = <THREE.Mesh>text.children[0];
		var centreOffset = -0.5 * ( mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x );
  
        var state = {
            position: new THREE.Vector3(-120, centreOffset + this._axisLength / 2, 0),
            rotation: new THREE.Vector3(0, Math.PI, Math.PI / 2)
        };

		return state;
	}
		
	// protected - Used in Initial Render
	public _getTitleInitAnimValues(state:any):any
	{
		var obj = { animLength: 1000,
					animObj: { pY:state.position.y-150 , opacity: 0 },
					targObj: { pY:state.position.y, opacity: 1 } };
			
		return obj;
	}

	private _getRightAxisAnimValues():any
	{
		var obj = { animLength: 1000,
					animObj: { rY: this.container.rotation.y },
					targObj: { rY: Math.PI/2 } };
			
		return obj;
	}
	// protected
	public _getInitAxisAnimValues():any
	{
		var obj = { animLength: 1000,
					animObj: { rX: this.container.rotation.x, rY: this.container.rotation.y, rZ: this.container.rotation.z },
					targObj: { rX: 0, rY: 0, rZ: 0 } };
			
		return obj;
	}
		
	// ANIMATIONS ========================================

	public axisToRightView():void
	{
		var scope = this;
		this._gotoAxisView( function() { return scope._getRightAxisAnimValues(); },
							function(text) { return scope._getTextAnimValues(text, scope._getMarkerInitState(text)); }, 
							function(text) { return scope._getTitleAnimValues(text, scope._getTitleInitState(text)); } );
	}

	public axisToBottomView():void
	{
		var scope = this;
		this._gotoAxisView( function() { return scope._getInitAxisAnimValues(); },
							function(text) { return scope._getTextAnimValues(text, scope._getMarkerBottomState(text)); }, 
							function(text) { return scope._getTitleAnimValues(text, scope._getTitleBottomState(text)); } );
	}			
}











