<template>
    <teleport to=".footerDiv">
        <footer :class="{'smallFooter':size=='small'}">
            <div class="curve"></div>
        
            <!-- Contact info -->
            <div class="footerContactInfo">
                <div class="footerContactInfoSingle">
                    <fa-icon icon="comments" />
                    <span>{{ $t('footer.chatWithUs') }}</span>
                </div>
            
                <div class="footerContactInfoSingle">
                    <fa-icon icon="phone" />
                    <span> {{phone}}</span>
                </div>
            
                <div class="footerContactInfoSingle">
                    <fa-icon icon="envelope" />
                    <span>{{email}}</span>
                </div>
            </div>
        
            <!-- Site Links -->
            <div class="footerRoadMap"><!-- Future router links-->
                <div class="footerRoadMapSingle">
                    {{ $t('home.homeText') }}
                </div>
            
                <div class="footerRoadMapSingle">
                    {{ $t('home.aboutText') }}
                </div>
            
                <div class="footerRoadMapSingle">
                    {{ $t('home.createText') }}
                </div>
            </div>
        
            <!-- Social media icons -->
            <div class="footerSocials">
                <fa-icon :icon="['fab', 'facebook']" />
                <fa-icon :icon="['fab', 'linkedin']" />
                <fa-icon :icon="['fab', 'twitter']" />
                <fa-icon :icon="['fab', 'github']" />
                <fa-icon :icon="['fab', 'instagram']" />
                <fa-icon :icon="['fab', 'youtube']" />
            </div>
        
            <div class="footerCopyrightContainer">
                <p class="footerCopyright">{{copyright}}</p>
            </div>
        </footer>

    </teleport>
</template>

<script>
import { ref } from 'vue'
import config from '../../config.js'

export default {
    props: ['size'],
    setup() {
        const phone = ref(config.contactNumber);
        const email = ref(config.contactEmail);
        const copyright = ref(config.copyright);

        return {phone, email, copyright}
    }
}
</script>

<style>
/* General footer CSS */
 footer {
    position: relative;
    bottom: 0px;
    width: 101vw;
    float: left;
    left: 0px;
    color:#2c3e50;
    background-color:#3ca576;
    margin-top: 80px;
    padding-top: 125px;
 }
 .footerContactInfo {
    position: relative;
    float: left;
    width: 33%;
    text-align: left;
    padding-left: 25px;
    height: 100px;
 }
 .footerContactInfo svg {margin-right:10px;}
 .footerContactInfoSingle {margin-bottom: 20px;}
 .footerRoadMap {    
    position: relative;
    float: left;
    width: 30%;
    }
 .footerRoadMapSingle {margin-bottom:15px;}
 .footerSocials {    
    position: relative;
    width: 31%;
    float: left;
    text-align: -webkit-center;
    font-size: 23px;
}
.footerSocials svg {display: list-item;margin-bottom: 5px;margin-left: 80px;}
.footerSocials svg:hover {transition:200ms;color:white;}
.footerCopyright {margin-bottom:10px;}
.footerCopyright {width:100%;}
.footerCopyrightContainer {position:relative;width:100%;float:left;}

/* Small CSS */
footer.smallFooter {left: 0px;}
.smallFooter .footerContactInfo {width:100%;text-align:center;margin-bottom:50px;padding-left: 0px;}
.smallFooter .footerRoadMap {width:100%;margin-bottom:30px;}
.smallFooter .footerSocials {width:100%;margin-bottom: 20px;}
.smallFooter .footerSocials svg {width:100%;margin-left:0px;}

/* Curvy CSS */
 .curve {
  position:absolute;
  height:150px;
  width:100%;
  top:0;
}
.curve::before {
  content:"";
  display:block;
  position:absolute;
  border-radius: 100% 50%;
  width: 55%;
  height:100%;
  background-color: #3ca576;
  transform: translate(85%, -37%);
}
.curve::after {
  content:"";
  display:block;
  position:absolute;
  border-radius: 100% 49%;
  width: 55%;
  height:100%;
  background-color: white;
  transform: translate(-4%, -56%);
}
</style>