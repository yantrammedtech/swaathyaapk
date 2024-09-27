import { createStore } from "redux";

const triageFormState = {
  zone: null,
  ward: "",
  wardID: 0,
  lastKnownSequence: "",
  criticalCondition: "",
  vitals: {
    oxygen: 0,
    pulse: 0,
    temperature: 0,
    bpH: 0,
    bpL: 0,
    respiratoryRate: 0,
    time: null,
  },
  abcd: {
    radialPulse: "", // should be absent/present or ''
    noisyBreathing: "",
    activeSeizures: "",
    cSpineInjury: "",
    angioedema: "",
    stridor: "",
    activeBleeding: "",
    incompleteSentences: "",
    capillaryRefill: "",
    alteredSensorium: "",
    activeBleedingType: "",
  },
  gcs: {
    eyeMovement: "",
    verbalResponse: "",
    motorResponse: "",
    painScale: "",
  },
  trauma: {
    traumaType: "",
    fallHeight: "",
    fracture: false,
    fractureRegion: "",
    amputation: false,
    neckSwelling: false,
    minorHeadInjury: false,
    abrasion: false,
    suspectedAbuse: false,
    chestInjuryType: "",
    stabInjurySeverity: "",
    stabInjuryLocation: "",
    stabHeadScalp: false,
    stabHeadFace: false,
    stabHeadNeck: false,
    stabChestHeart: false,
    stabChestLungs: false,
    stabChestMajorBloodVessels: false,
    stabAbdomenStomach: false,
    stabAbdomenLiver: false,
    stabAbdomenKidneys: false,
    stabAbdomenSpleen: false,
    stabAbdomenIntestines: false,
    stabExtremityArm: false,
    stabExtremityLeg: false,
    stabExtremityMuscles: false,
    stabExtremityTendons: false,
    stabExtremityNerves: false,
    stabExtremityBloodVessels: false,
  },
  nonTrauma: {
    pregnancy: false,
    pregnancyIssue: "",
    trimester: "",
    breathlessness: false,
    edema: false,
    internalBleeding: false,
    internalBleedingCause: "",
    poisoning: false,
    poisoningCause: "",
    burn: false,
    burnPercentage: "",
    hanging: false,
    drowning: false,
    electrocution: false,
    heatStroke: false,
    fever: false,
    feverSymptoms: "",
    drugOverdose: false,
    stoolPass: false,
    urinePass: false,
    swellingWound: false,
    dizziness: false,
    headache: false,
    coughCold: false,
    skinRash: false,
    medicoLegalExamination: false,
  },

  errors: {
    vitals: {
      oxygen: "",
      pulse: "",
      temperature: "",
      respiratoryRate: "",
      bpH: "",
      bpL: "",
    },
    abcd: {
      radialPulse: "",
      noisyBreathing: "",
      activeSeizures: "",
      cSpineInjury: "",
      angioedema: "",
      stridor: "",
      activeBleeding: "",
      incompleteSentences: "",
      capillaryRefill: "",
      alteredSensorium: "",
      activeBleedingType: "",
    },
    gcs: {
      eyeMovement: "",
      verbalResponse: "",
      motorResponse: "",
      painScale: "",
    },
    trauma: {
      traumaType: "",
      fractureRegion: "",
      fallHeight: "",
    },
    nonTrauma: {
      poisoningCause: "",
      burnPercentage: "",
      feverSymptoms: "",
      trimester: "",
      pregnancyIssue: "",
      internalBleedingCause: "",
    },
  },
};

const initialVitals = [
  {
    oxygen: [],
    temperature: [],
    pulse: [],
    bp: [],
    respiratoryRate: [],
  },
];


const initialMainFormFields = {
  mouthOpening: null,
  neckRotation: null,
  tmDistance: null,
  mp1: false,
  mp2: false,
  mp3: false,
  mp4: false,
  morbidObesity: false,
  difficultAirway: false,
  teethPoorRepair: false,
  micrognathia: false,
  edentulous: false,
  beard: false,
  shortMuscularNeck: false,
  prominentIncisors: false,
};

const initialExaminationFindingNotes = {
  examinationFindingNotes: '',
  smokingTobacco: '',
  cardioVascularExamination: '',
  abdominalExamination: '',
  alcohol: '',
  neuroMuscularExamination: '',
  spineExamination: '',
};

const initialGeneralPhysicalExamination = {
  jvp: false,
  pallor: false,
  cyanosis: false,
  icterus: false,
  pupils: false,
  edema: false,
  syncopatAttack: false,
  paipitation: false,
  other: false,
};

const initialMallampatiGrade = {
  class : 0,
};

const initialRespiratory = {
  dryCough: false,
  productiveCough: false,
  asthma: false,
  recentURILRTI: false,
  tb: false,
  pneumonia: false,
  copd: false,
  osa: false,
  recurrentTonsils: false,
  breathlessness: false,
  dyspnea: false,
};

const initialHepato = {
  vomiting: false,
  gerd: false,
  diarrhoea: false,
  galbladderDS: false,
  jaundice: false,
  cirrhosis: false,
};

const initialCardioVascular = {
  hypertension: false,
  cafDOE: false,
  ischemicHeartDisease: false,
  rheumaticFever: false,
  orthpneaPND: false,
  murmurs: false,
  cad: false,
  exerciseTolerance: false,
  cardicEnlargement: false,
  angina: false,
  mi: false,
  mtdLessThan4: false,
  mtdGreaterThan4: false,
};

const initialNeuroMuscular = {
  rhArthritis: false,
  gout: false,
  backache: false,
  headAche: false,
  seizures: false,
  scoliosisKyphosis: false,
  paresthesia: false,
  locUnconscious: false,
  muscleWeakness: false,
  cvaTia: false,
  headInjury: false,
  paralysis: false,
  psychDisorder: false,
};

const initialRenal = {
  uti: false,
  haemateria: false,
  renalInsufficiency: false,
  aorenocorticalInsuff: false,
  thyroidDisorder: false,
  pituitaryDisorder: false,
  diabeticsMalitus: false,
};

const initialOthers = {
  hematDisorder: false,
  pregnant: false,
  radiotherapy: false,
  chemotherapy: false,
  immuneSuppressed: false,
  steroidUse: false,
  cervicalSpineMovement: false,
  intraopUrineOutput: false,
  bloodLossToBeRecorded: false,
};


const otPhysicalExaminationForm ={
  mainFormFields: initialMainFormFields,
  examinationFindingNotes: initialExaminationFindingNotes,
  generalphysicalExamination: initialGeneralPhysicalExamination,
  mallampatiGrade: initialMallampatiGrade,
  respiratory: initialRespiratory,
  hepato: initialHepato,
  cardioVascular: initialCardioVascular,
  neuroMuscular: initialNeuroMuscular,
  renal: initialRenal,
  others: initialOthers,
}

const initialData = {
  currentUserData: null,
  currentPatientData: null,
  allPatientsList: null,
  triageData: triageFormState,
  currentZone: "red",
  vitals: initialVitals,
  userType:null,
  otPhysicalExamination:otPhysicalExaminationForm
};

function Reducer(state = initialData, action) {
  switch (action.type) {
    case "currentUserData": //patient data
      return { ...state, currentUserData: action.payload };
    case "currentPatientData":
      return { ...state, currentPatientData: action.payload };
    case "allPatientsList":
      return { ...state, allPatientsList: action.payload };
    case "updateTriageData":
      return { ...state, triageData: action.payload };
    case "currentZone":
      return { ...state, currentZone: action.payload };
      case "updateVitals":
        return {
          ...state,
          vitals: [
            {
              oxygen: action.payload.oxygen || state.vitals[0].oxygen,
              pulse: action.payload.pulse || state.vitals[0].pulse,
              bp: action.payload.bp || state.vitals[0].bp,
              respiratoryRate: action.payload.respiratoryRate || state.vitals[0].respiratoryRate,
              temperature: action.payload.temperature || state.vitals[0].temperature,
            }
          ]
        };

        case "userType": //userType OT
        return { ...state, userType: action.payload };
        case "updateOtPhysicalExamination":
          return { ...state,
            otPhysicalExamination: {
              ...state.otPhysicalExamination,
              // Update only the properties provided in the payload
              mainFormFields: action.payload.mainFormFields
                ? action.payload.mainFormFields
                : state.otPhysicalExamination.mainFormFields,

              generalphysicalExamination: action.payload.generalphysicalExamination
                ? action.payload.generalphysicalExamination
                : state.otPhysicalExamination.generalphysicalExamination,

                mallampatiGrade: action.payload.mallampatiGrade
                ? { ...state.otPhysicalExamination.mallampatiGrade, ...action.payload.mallampatiGrade }
                : state.otPhysicalExamination.mallampatiGrade,

                respiratory: action.payload.respiratory
                ? action.payload.respiratory
                : state.otPhysicalExamination.respiratory,

                hepato: action.payload.hepato
                ? action.payload.hepato
                : state.otPhysicalExamination.hepato,

                cardioVascular: action.payload.cardioVascular
                ? action.payload.cardioVascular
                : state.otPhysicalExamination.cardioVascular,

                neuroMuscular: action.payload.neuroMuscular
                ? action.payload.neuroMuscular
                : state.otPhysicalExamination.neuroMuscular,

                renal: action.payload.renal
                ? action.payload.renal
                : state.otPhysicalExamination.renal,

                others: action.payload.others
                ? action.payload.others
                : state.otPhysicalExamination.others,
            },
            };
    default:
      return state;
  }
}

const store = createStore(Reducer);

export default store;

// import { createStore } from 'redux';
// import axios from 'axios';

// const login = localStorage.getItem('isLogin');

// let initialState = {
//   isUserLogin: login,
//   userid:'',
//   allProducts: [],
//   apiStatus: false,
//   cartListData: [],
// };

// async function getUserCartList(dispatch) {
//   try {
//     const token = localStorage.getItem('userToken');
//     const userid = localStorage.getItem('userid');

//     if (token && userid) {
//       const res = await axios.get(
//         `${process.env.REACT_APP_API}/api/v1/userCart/items`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           params: {
//             userid,  // Pass userid as a query parameter
//           },
//         }
//       );

//       // Dispatch an action to update cartListData in the Redux store
//       dispatch({ type: 'cartItems', payload: res.data.data });
//     }
//   } catch (error) {
//     // Handle error if needed
//     console.error('Error fetching user cart items:', error);
//   }
// }

// // Create a store with the reducer
// function storeReducer(state = initialState, action) {

//   switch (action.type) {
//     case 'Login':
//       return { ...state, isUserLogin: action.payload };
//     case 'addProducts':
//       return { ...state, allProducts: action.payload };
//     case 'apiStatus':
//       return { ...state, apiStatus: action.payload };
//     case 'userid':
//       return { ...state, userid: action.payload };
//     case 'cartItems':
//       // Update cartListData with the payload from the action
//       return { ...state, cartListData: action.payload };
//     default:
//       return state;
//   }
// }

// // Create the Redux store
// const store = createStore(storeReducer);

// // Call the getUserCartList function with the dispatch function from the store
// getUserCartList(store.dispatch);

// export default store;
