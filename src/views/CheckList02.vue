<template>
    <b-container>
        <h3 class="text-center my-2">Assessment of Fish Collecting/Transport boats</h3>
        <b-overlay :show="isLoading">
            <b-form class="mt-2" id="assesment-pdf" @submit.prevent="onFormSubmit">
                <h5>Assessment of Collecting / Transport Boats</h5>
                <table class="table">
                    <tbody>
                        <tr>
                                <b-form-group label="Reason for the inspection">
                                    <b-form-input v-model="form.inspection_reason"></b-form-input>
                                </b-form-group>
                        </tr>
                        <tr>
                            <td>
                                <b-form-group label="Boat Register">
                                    <b-form-input v-model="form.boat_register" readonly></b-form-input>
                                </b-form-group>
                            </td>
                            <td>
                                <b-form-group label="Owner">
                                    <b-form-input :value="form.owner" readonly></b-form-input>
                                </b-form-group>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b-form-group label="Date">
                                    <b-form-datepicker v-model="form.date" readonly></b-form-datepicker>
                                </b-form-group>
                            </td>
                            <td>
                                <b-form-group label="Name of Inspector">
                                    <b-form-input v-model="form.inspector_name" readonly></b-form-input>
                                </b-form-group>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h5>Sanitary Requirements</h5>
                <table class="table">
                    <thead>
                        <th>Vessel and Equipment</th>
                        <th>Condition</th>
                        <th>Comments</th>
                    </thead>
                    <tbody>
                        <tr v-for="item in form.sanitary" :key="item.label">
                            <td>
                                {{item.label}}
                            </td>
                            <td class="condition">
                                <b-form-radio-group :options="condition_options" v-model="item.value">
                                </b-form-radio-group>
                            </td>
                            <td class="form-comments">
                                <b-form-group>
                                    <b-form-input v-model="item.comments" required>
                                    </b-form-input>
                                </b-form-group>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h5>FP and Ice Handling</h5>
                <table class="table caption-top">
                    <tbody>
                        <tr v-for="item in form.ice_handling" :key="item.label">
                            <td>
                                {{item.label}}
                            </td>
                            <td class="condition">
                                <b-form-radio-group v-model="item.value" :options="condition_options">
                                </b-form-radio-group>
                            </td>
                            <td class="form-comments">
                                <b-form-group>
                                    <b-form-input v-model="item.comments"></b-form-input>
                                </b-form-group>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h5>Hygiene</h5>
                <table class="table">
                <tbody>
                        <tr v-for="item in form.hygiene" :key="item.label">
                            <td>
                                {{item.label}}
                            </td>
                            <td class="condition">
                                <b-form-radio-group v-model="item.value" :options="condition_options">
                                </b-form-radio-group>
                            </td>
                            <td class="form-comments">
                                <b-form-group>
                                    <b-form-input v-model="item.comments"></b-form-input>
                                </b-form-group>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h5>Summary of defects found and correctives actions requested</h5>
                <table class="table">
                    <thead>
                        <th>Non-Compliances</th>
                        <th>Correction Date limit</th>
                        <th>Corrected</th>
                        <th>Comments</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in form.summary" :key="index">
                            <td style="min-width:300px;">
                                <b-form-input v-model="item.non_compliance"></b-form-input>
                            </td>
                            <td>
                                <b-form-datepicker v-model="item.correction_date_limit"></b-form-datepicker>
                            </td>
                            <td>
                                <b-form-checkbox v-model="item.corrected"></b-form-checkbox>
                            </td>
                            <td style="min-width:300px;">
                                <b-form-input v-model="item.comments"></b-form-input>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <b-form-group label="Observations and Conclusions" class="mb-1">
                    <b-textarea v-model="form.observations_and_conclusions" rows="5">
                    </b-textarea>
                </b-form-group>
                <b-button type="submit" variant="info" class="w-25 ml-auto mb-1">Submit</b-button>
            </b-form>
        </b-overlay>
    </b-container>
</template>
<style scoped>
.condition{
    min-width:300px;
}
.form-comments{
    min-width: 400px;
}
</style>
<script>
    import auth from "../plugins/auth";
    import {axiosApiInst} from "../plugins/axios";
    import html2pdf from "html2pdf.js";
    export default {
        data(){
            const today = this.getToday(); 
            return {
                form:{
                    inspection_reason:"",
                    application_no:"",
                    boat_register:"",
                    date:today,
                    inspector_name:"",
                    owner:"",
                    observations_and_conclusions:"",
                    sanitary:[
                        {
                            label:"FP and ice protected from contamination and heat?",
                            value:null,
                            comments:""
                        },
                        {
                            label:"FP and ice stored in clean, well maintained, easy to clean and disinfect holds in accordance with good practice?",
                            value:null,
                            comments:""
                        },
                        {
                            label:"Surfaces in direct contact with FP and ice are clean, smooth, easy to clean, durable and non corrosive?",
                            value:null
                        },
                        {
                            label:"Provision for hygienic drainage of melt water?",
                            value:null
                        },
                        {
                            label:"Handling equipment coming into contact with FP and ice is well maintained, easy to clean and disinfect, non-corrosive and stored safely?",
                            value:null,
                            comments:""
                        },
                        {
                            label:" FP and ice separated from fuel and lubricants?",
                            value:null,
                            comments:""
                        },
                        {
                            label:"Vessel is not used to transport unauthorised passengers or goods?",
                            value:null,
                            comments:""
                        },
                        {
                            label:"Fish Movement permits are available for inspection for current consignment.",
                            value:null,
                            comments:""
                        }
                    ],
                    ice_handling:[
                        {
                            label:"Good FP and ice handling and storage practices are observed by crew?",
                            value:null,
                            comments:""
                        },
                        {
                            label:"Handling equipment does not damage edible parts of fishery products?",
                            value:null,
                            comments:""
                        },
                        {
                            label:"FP Loading and unloading operations carried out rapidly, avoiding contamination of FP?",
                            value:null,
                            comments:""
                        },
                        {
                            label:"Ice loaded using containers made of clean, smooth, easy to clean, durable, non-corrosive materials?",
                            value:null,
                            comments:""
                        },
                        {
                            label:"FP is iced in accordance with good icing practice?",
                            value:null,
                            comments:""
                        },
                        {
                            label:"Ice is made from potable or clean water and obtained from an approved supplier?",
                            value:null,
                            comments:""
                        }
                    ],
                    hygiene:[
                        {
                            label:"All vessel FP contact surfaces washed using potable or clean water and disinfected in accordance with GHP after landing?",
                            value:null,
                            comments:""
                        },
                        {
                            label:"FP and ice containers washed with potable or clean water and disinfected in accordance with GHP after each use?",
                            value:null,
                            comments:""
                        },
                        {
                            label:"Tools and equipment coming into contact with FP and ice washed with potable or clean water and disinfected in accordance with GHP after each use?",
                            value:null,
                            comments:""
                        }
                    ],
                    summary:[
                        {non_compliance:null,correction_date_limit:null,corrected:false,comments:null},
                        {non_compliance:null,correction_date_limit:null,corrected:false,comments:null},
                        {non_compliance:null,correction_date_limit:null,corrected:false,comments:null},
                        {non_compliance:null,correction_date_limit:null,corrected:false,comments:null}
                    ]
                },
                condition_options:[
                    {text:"C",value:"C"},
                    {text:"S",value:"S"},
                    {text:"M",value:"M"},
                    {text:"m",value:"m"}
                ],
                isLoading:false
            }

        },
        computed:{
            isLoggedIn(){
                
                return sessionStorage.getItem("token")!=null;
            }
        },
        mounted(){
            this.isLoading = true;
            if(!this.isLoggedIn){
                this.signIn();
            }else{
                this.loadForm();
            }
        },
        methods:{
            signIn(){
                let token = this.$route.query['token'];
                if(!token){
                    alert("Unauthorized access to form");
                }
                auth.signIn(token,(res)=>{
                    sessionStorage.setItem("token",res.data.access_token);
                    sessionStorage.setItem("user",JSON.stringify(res.data.user));
                    this.loadForm();
                },()=>{
                    alert("Unauthorized access to form");
                });
            },
            loadForm(){
                let license_id = this.$route.query["license_id"];
                axiosApiInst.get(process.env.VUE_APP_BACKEND+"/submitted-applications/"+license_id).then((res)=>{
                    const user = JSON.parse(sessionStorage.getItem("user"))
                    this.form['inspector_name'] = user['name'];
                    this.form['owner'] = res.data['applicant']['name'];
                    this.form['application_no'] = res.data['application_no'];
                    this.form['boat_register'] = res.data['vessel_registration_number'];
                    this.isLoading = false;
                });
            },
            onSubmit(file){
                const data = new FormData();
                data.set('application_no',this.form['application_no']);
                data.append('inspection_report',file);
                data.set('inspection_recommendation',this.form['observations_and_conclusions']);
                axiosApiInst.post(process.env.VUE_APP_BACKEND+"/inspected-applications/",data).then(()=>{
                    alert("Close window");
                });
            },
            onFormSubmit(){
                const elementToConvert = document.getElementById("assesment-pdf");
                // const options = {margin: 1,filename: "my-document.pdf"};
                const options = {jsPDF:{orientation:'landscape'}, margin:[5,5,5,5],pagebreak: { mode: ['css']}};
                html2pdf().from(elementToConvert).set(options).toPdf().get('pdf').then(pdf=>{
                    
                    this.onSubmit(pdf.output('blob'));
                });
            },
            getToday(){
                const today = new Date();
                const year = today.getFullYear();
                const month = today.getMonth() + 1; // January is 0, so add 1 to get the actual month number
                const day = today.getDate();

                const todayString = `${year}-${month}-${day}`;
                return todayString;
            }
        }
    }

</script>