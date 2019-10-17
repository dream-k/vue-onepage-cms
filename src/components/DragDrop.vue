<template>
  <div id="container" class="container">
    <!-- <div style="width:500px;height:500px;" id="map">
    </div> -->
    <div class="header">
      <!-- export button-->
      <button type="button" class="exportPdfButton" v-on:click="exportPdf">Export to PDF</button>
      <!-- <button type="button" v-on:click="initMap">Init Map</button> -->
    </div>
    <div class="top-section">
      <div class="description">
        <img src="../assets/dragDropIcon.png">
        <span>Drag and drop into a section below</span>
      </div>
      <div class="top-items-wrapper">
        <div class="top-item">
          <span>Text Editor</span>
          <div>
            <img draggable="true" @dragstart="dragStart(1,$event)" @dragover.prevent @dragenter="dragEnter" @dragleave="dragLeave"  @dragend="dragEnd"  src="../assets/textEditorIcon.jpg">
          </div>
        </div>
        <div class="top-item">
          <span>Heat Map</span>
          <div>
            <img draggable="true" @dragstart="dragStart(2,$event)" @dragover.prevent @dragenter="dragEnter" @dragleave="dragLeave"  @dragend="dragEnd"  src="../assets/heatMapIcon.jpg">
          </div>
        </div>
        <div class="top-item">
          <span>Table</span>
          <div>
            <img draggable="true" @dragstart="dragStart(3,$event)" @dragover.prevent @dragenter="dragEnter" @dragleave="dragLeave"  @dragend="dragEnd" src="../assets/tableIcon.png">
          </div>
        </div>
      </div>
    </div>
    <div id="content" class="content">
      <div id="addWindow" class="content-top-action-wrapper">
        <img v-on:click="addSplitWindow" src="../assets/addSplitWindow.jpg">
        <img v-on:click="addOneWindow" src="../assets/addOneWindow.png">
      </div>
      <div v-for="(window,index) in windowArray" :key="index" class="window-item">
        <div>
          <img v-on:click="closeWindow(index)" src="../assets/closeWindowIcon.png" style="width:30px;float:right;margin-top:-30px;">
        </div>
        <div class="window-item-content" v-bind:id="'windowItem'+index">
          <div id="one" @dragover.prevent @drop="dragFinish(-1,$event,index)"  v-bind:class="{drag:isDragging}" class="oneWindow" v-if="window.type=='one'"> 
            <froala id="textEditor" class="textEditor"   v-model="window.model1" v-if="window.dragged1==1 && window.id1=='one'"></froala>
            <vue-google-heatmap id="heatMap" :points="points" 
                    class="heatMap"    v-if="window.displayMap1==1 && window.dragged1==2 && window.mapid1=='one'"/>
                <!-- <div id="map" class="heatMap" ></div> -->
                <div v-if="window.displayTable1==1 && window.dragged1==3" class="table">
                  <!-- insert table componenet here -->
                  <table id="table" class="dataTable">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Profession</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row,i) in rows" :key="i">
                        <td>{{row.id}}</td>
                        <td>{{row.name}}</td>
                        <td>{{row.phone}}</td>
                        <td>{{row.profession}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>      
          </div>
          <div class="splitWindow" v-if="window.type=='split'">
            <div id="left"  @dragover.prevent @drop="dragFinish(-1,$event,index)"  v-bind:class="{drag:isDragging}">
              
              <froala id="textEditor" class="textEditor" v-model="window.model1" v-if="window.dragged1==1 && window.id1=='left'"></froala>
              <vue-google-heatmap id="heatMap" :points="points"
                      class="heatMap"  v-if="window.displayMap1==1 && window.dragged1==2 && window.mapid1=='left'"/>
              <!-- <div id="map" class="heatMap" v-if="window.displayMap1==1 && window.dragged1==2 && window.mapid1=='right'"></div> -->
              <div v-if="window.displayTable1==1 && window.dragged1==3" class="table">
                  <table id="table" class="dataTable">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Profession</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row,i) in rows" :key="i">
                        <td>{{row.id}}</td>
                        <td>{{row.name}}</td>
                        <td>{{row.phone}}</td>
                        <td>{{row.profession}}</td>
                      </tr>
                    </tbody>
                  </table>
              </div> 
            </div>
            <div id="right"  @dragover.prevent @drop="dragFinish(-1,$event,index)"  v-bind:class="{drag:isDragging}">              
              <froala id="textEditor" class="textEditor"  v-model="window.model2"  v-if="window.dragged2==1 && window.id2=='right'"></froala>
              <vue-google-heatmap id="heatMap" :points="points"
                      class="heatMap"  v-if="window.displayMap2==1 && window.dragged2==2 && window.mapid2=='right'"/>
              <!-- <div id="map" class="heatMap" v-if="window.displayMap2==1 && window.dragged2==2 && window.mapid2=='right'"></div> -->
              <div v-if="window.displayTable2==1 && window.dragged2==3" class="table">
                  <table id="table" class="dataTable">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Profession</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row,i) in rows" :key="i">
                        <td>{{row.id}}</td>
                        <td>{{row.name}}</td>
                        <td>{{row.phone}}</td>
                        <td>{{row.profession}}</td>
                      </tr>
                    </tbody>
                  </table>
              </div>
            </div>
          </div>
        </div>
        <div class="content-top-action-wrapper">
          <img v-on:click="addSplitWindow" src="../assets/addSplitWindow.jpg">
          <img v-on:click="addOneWindow" src="../assets/addOneWindow.png">
        </div>
      </div>
    </div>
    <div id="pdfElement"></div>
    <div class="modal" ref="modal" v-bind:style="modalStyleObject">
      <p v-if="dragged==2" class="modal-header">Duration Configuration</p>
      <p v-if="dragged==2" class="modal-description">Please choose duration</p>
      <p v-if="dragged==3" class="modal-header">Table Configuration</p>
      <p v-if="dragged==3" class="modal-description">Please choose table</p>
      <select v-model="selectedVal"  v-on:change="changeSelect(selectedVal)">
        <option selected disabled hidden>Select</option>
        <option v-if="dragged==2" v-for="(mapDuration,i) in mapDurations" :key="i">
          {{mapDuration.text}}
        </option>
        <option v-if="dragged==3" v-for="(table,i) in tableTypes" :key="i">
          {{table.text}}
        </option>
      </select>
    </div>
    <div id="pdf" ></div>
  </div>
</template>
<script>
import jsPDF from 'jsPDF';//to export to pdf
import VueFroala from 'vue-froala-wysiwyg';//to use texteditor
import VueHtml2Canvas from 'vue-html2canvas';
const TODO_STORAGE_KEY = 'todostorage';

let todoStorage = {
  fetch: () => JSON.parse(localStorage.getItem(TODO_STORAGE_KEY) || "[]"),
  save: todos => localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos))
};

export default {
  name: 'DragDrop',
  data () {
    return {
      msg: 'Welcome to Your Drag and Drop App',
      windowArray: [],
      todos: todoStorage.fetch(),
      newItem: "",
      dragging: -1,
      name:'',
      points: [
      {lat: 37.786117, lng:-122.440119},
      {lat: 37.786564, lng:-122.440209},
      {lat: 37.786905, lng:-122.440270},
      {lat: 37.786956, lng:-122.440279},
      {lat: 37.800224, lng:-122.433520},
      {lat: 37.800155, lng:-122.434101},
      {lat: 37.800160, lng:-122.434430},
      {lat: 37.800378, lng:-122.434527},
      {lat: 37.800738, lng:-122.434598},
      {lat: 37.800938, lng:-122.434650},
      {lat: 37.801024, lng:-122.434889},
      {lat: 37.800955, lng:-122.435392},
      {lat: 37.800886, lng:-122.435959}
      ],
      rows: [
      { id: 1, name: "Chandler Bing", phone: '305-917-1301', profession: 'IT Manager' },
      { id: 2, name: "Ross Geller", phone: '210-684-8953', profession: 'Paleontologist' },
      { id: 3, name: "Rachel Green", phone: '765-338-0312', profession: 'Waitress'},
      ],
      dragged:-1,
      draggedTargetIndex:-1,
      draggedTargetPosition:'',
      selectedVal: 'Select',
      mapDurations:[
        {value:1,text:"1 month"},
        {value:3,text:"3 month"},
        {value:6,text:"6 month"}
      ],
      tableTypes:[
        {value:1,text:"events"},
        {value:2,text:"employees"}
      ],
      modalStyleObject: {
        top: '0px',
        left: '0px',
        display: 'none'
      }

    }
  },
  mounted() {
    let recaptchaScript1 = document.createElement('script')
    recaptchaScript1.setAttribute('src', 'https://files.codepedia.info/files/uploads/iScripts/html2canvas.js')
    document.head.appendChild(recaptchaScript1)
    // let recaptchaScript2 = document.createElement('script')
    // recaptchaScript2.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBLwBvYokJRQYItglMFg8mD2gIjSIq6pdM&libraries=visualization')
    // document.head.appendChild(recaptchaScript2)
  },
  methods: {
    addSplitWindow: function (event) {
      this.windowArray.push({type:'split',displayMap1:0,displayMap2:0,displayTable1:0,displayTable2:0,dragged1:-1,dragged2:-1, id1:'',id2:'',model1:'',model2:'',mapid1:'',mapid2:''});
    },
    addOneWindow: function (event) {
      this.windowArray.push({type:'one',displayMap1:0, displayMap2:0,displayTable1:0,displayTable2:0,dragged1:-1,dragged2:-1,id1:'',id2:'',model1:'',model2:'',mapid1:'',mapid2:''});
    },
    closeWindow: function (event) {
      
      this.windowArray.splice(event,1);
    },
    exportPdfTotal:function(doc,props,contents,i, total,isSplit)
    {
      //console.log("sdfsdfsdf", i);
        if(i >= total) {
          doc.save('html.pdf');
          return;
        }
        var windowId='windowItem'+i;
        var windowItem=document.getElementById(windowId);
        //console.log(windowId);return;
        //console.log(document.getElementById(windowId));return;
        var window=contents[i];
        var that=this;
        var htmlContent,htmlContent1,htmlContent2;
        if(window.type=='one'){
          if(window.dragged1==1){
            htmlContent=windowItem.getElementsByClassName("fr-wrapper");
          }
          if(window.dragged1==2){
            htmlContent=windowItem.getElementsByClassName("gm-style");
          }
          if(window.dragged1==3){
            htmlContent=windowItem.getElementsByClassName("dataTable");
          }
          // var that =  this;
          
          //doc.save('html.pdf');
        } 
        if(window.type=='split'){
            if(window.dragged1>0){
              if(window.dragged1==1){
                htmlContent1=windowItem.getElementsByClassName("fr-wrapper");
              }
              if(window.dragged1==2){
                htmlContent1=windowItem.getElementsByClassName("gm-style");
              }
              if(window.dragged1==3){
                htmlContent1=windowItem.getElementsByClassName("dataTable");
              }
             
            }
            if(window.dragged2>0){
              if(window.dragged2==1){
                htmlContent2=windowItem.getElementsByClassName("fr-wrapper");
              }
              if(window.dragged2==2){
                htmlContent2=windowItem.getElementsByClassName("gm-style");
              }
              if(window.dragged2==3){
                htmlContent2=windowItem.getElementsByClassName("dataTable");
              }
              
            }
        }
        // if(isSplit) {htmlContent='';htmlContent1='';}
        if(htmlContent && !isSplit) {
          html2canvas(htmlContent,{
            useCORS:true,
            onrendered: function(canvas){  
              var img=canvas.toDataURL("image/png");
              var imgWidth=canvas.width;
              var imgHeight=canvas.height;
              props.positionX=25;
              props.positionY=props.positionY+props.spaceY;
              console.log("one",imgHeight);
              doc.addImage(img,'JPEG',props.positionX,props.positionY,props.pdfWidth,props.pdfWidth*imgHeight/imgWidth);
              that.exportPdfTotal(doc,props,contents, i+1, total,false);return;
            }
          })
        }
        if(htmlContent1 && !isSplit){
            html2canvas(htmlContent1,{
                 useCORS:true,
                 onrendered: function(canvas){  
                  var img=canvas.toDataURL("image/png");
                  var imgWidth=canvas.width;
                  var imgHeight=canvas.height;
                  //var doc=new jsPDF('p','mm','a4');
                  props.positionX=20;
                  props.positionY=props.positionY+props.spaceY;
                  console.log("left",imgHeight);        
                  doc.addImage(img,'JPEG',props.positionX,props.positionY,props.pdfWidth/2,props.pdfWidth*imgHeight/imgWidth/2);
                  if(htmlContent2){ 
                    props.positionY=props.positionY-props.spaceY;
                    that.exportPdfTotal(doc,props,contents,i,total,true);return;
                    }
                  if(!htmlContent2){that.exportPdfTotal(doc,props,contents, i+1, total,false);return;}
                  //doc.save('html.pdf');
                  //document.getElementById("pdf").appendChild(canvas);
                  // doc.addImage(img,'JPEG',20,40,pdfWidth,pdfWidth*imgHeight/imgWidth);
                  // doc.save('html.pdf');
                }
              })
        }
      
        if((!htmlContent1 && htmlContent2) || (isSplit && htmlContent2)){
          html2canvas(htmlContent2,{
                useCORS:true,
                onrendered: function(canvas){  
                  var img=canvas.toDataURL("image/png");
                  var imgWidth=canvas.width;
                  var imgHeight=canvas.height;
                  //console.log(canvas,2);
                  //var doc=new jsPDF('p','mm','a4');
                  props.positionX=20+props.pdfWidth/2+props.spaceX;
                  props.positionY=props.positionY+props.spaceY;
                  console.log('right',imgHeight);        
                  doc.addImage(img,'JPEG',props.positionX,props.positionY,props.pdfWidth/2,props.pdfWidth*imgHeight/imgWidth/2);
                  that.exportPdfTotal(doc,props,contents, i+1, total,false);return;
                }
              })
          //that.exportPdfTotal(doc,props,contents,i+1,total,false);return;
          }
        if(!htmlContent && !htmlContent1 && !htmlContent2) {
          that.exportPdfTotal(doc,props,contents, i+1, total,false);return;
        }

    },
    exportPdf: function(event){
      var doc=new jsPDF();
      var pdfWidth=doc.internal.pageSize.getWidth()-50;
      var pdfHeight=doc.internal.pageSize.getHeight();
      var spaceX=10;
      var spaceY=70;
      var positionX=20;
      var positionY=-50;
      var props={pdfWidth:pdfWidth,pdfHeight:pdfHeight,positionX:positionX,positionY:positionY,spaceX:spaceX,spaceY:spaceY};
      //htmlContent=document.getElementById("textEditor");
      this.exportPdfTotal(doc,props,this.windowArray, 0, this.windowArray.length,false);return;
    },
    dragStart(which, ev) {
      ev.dataTransfer.setData('Text', this.id);
      ev.dataTransfer.dropEffect = 'move'
      this.dragging = which;
    },
    dragEnter(ev) {
    },
    dragLeave(ev) {
    },
    dragEnd(ev) {
      this.dragging = -1
      
    },
    dragFinish(to, ev,index) {      
      if(this.dragging>1){
        this.modalStyleObject = {
          top: ev.clientY + 'px',
          left: ev.clientX + 'px',
          display: 'block'
        }
      }
      this.dragged=this.dragging;
      this.draggedTargetIndex=index;
      this.draggedTargetPosition=ev.target.id;
      //console.log(ev);
      if(this.dragging==1){
        if(ev.target.id=='one') {this.windowArray[index].dragged1=1;this.windowArray[index].id1='one';this.windowArray[index].mapid1='';this.windowArray[index].model1='Type text here';this.windowArray[index].model2='Type text here';}
        if(ev.target.id=='left') {this.windowArray[index].dragged1=1;this.windowArray[index].id1='left';this.windowArray[index].mapid1='';this.windowArray[index].model1='Type text here';}
        if(ev.target.id=='right') {this.windowArray[index].dragged2=1;this.windowArray[index].id2='right';this.windowArray[index].mapid2='';this.windowArray[index].model2='Type text here';}   
      }
      //heat map
      if(this.dragging==2){
        if(ev.target.id=='one') {this.windowArray[index].mappopup1=1;this.windowArray[index].dragged1=2;this.windowArray[index].id1='';this.windowArray[index].mapid1='one';}
        if(ev.target.id=='left') {this.windowArray[index].mappopup1=1;this.windowArray[index].dragged1=2;this.windowArray[index].id1='';this.windowArray[index].mapid1='left';}
        if(ev.target.id=='right') {this.windowArray[index].mappopup2=1;this.windowArray[index].dragged2=2;this.windowArray[index].id2='';this.windowArray[index].mapid2='right';}   
      }
      //data table
      if(this.dragging==3){
        if(ev.target.id=='one') {this.windowArray[index].tablepopup1=1;this.windowArray[index].dragged1=3;this.windowArray[index].id1='';this.windowArray[index].mapid1='one';}
        if(ev.target.id=='left') {this.windowArray[index].tablepopup1=1;this.windowArray[index].dragged1=3;this.windowArray[index].id1='';this.windowArray[index].mapid1='left';}
        if(ev.target.id=='right') {this.windowArray[index].tablepopup2=1;this.windowArray[index].dragged2=3;this.windowArray[index].id2='';this.windowArray[index].mapid2='right';}   
      }

    },
    changeSelect(val) {
      // console.log(val);
      this.modalStyleObject={
        display:'none'
      }
      this.selectedVal='Select';
      if(this.draggedTargetPosition=='right') {
        if(this.dragged==2) this.windowArray[this.draggedTargetIndex].displayMap2=1;
        if(this.dragged==3) this.windowArray[this.draggedTargetIndex].displayTable2=1;
      }
      if(this.draggedTargetPosition!=='right') {
       if(this.dragged==2) this.windowArray[this.draggedTargetIndex].displayMap1=1;
       if(this.dragged==3) this.windowArray[this.draggedTargetIndex].displayTable1=1;
      }
    },
  },

  computed: {
    isDragging() {
      return this.dragging > -1
    }
  },
  // watch todos change for localStorage persistence
  watch: {
    todos: {
      handler: function(todos) {
        todoStorage.save(todos);
      },
      deep: true
    }
  }
}   
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
 
