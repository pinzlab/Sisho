import Vue from 'vue'
import Component from 'vue-class-component'
import service from '@/services/MedicalRecordService'
import patientService from '@/services/PatientService'
import { createMedicalRecord, Patient, createPatient } from '@/models'
import { MedicalRecord } from '@/models'
import Search from '@/utils/search'
import { Watch } from 'vue-property-decorator'
import alert from '@/utils/alert'
import List from './MedicalRecordList.vue'
import PatientInfo from './PatientInfo.vue'
import Antecedent from './Antecedent.vue'

@Component({ components: { List, PatientInfo, Antecedent } })
export default class MedicalRecordController extends Vue {
  /********************************************************
   *                      Attributes                       *
   ********************************************************/

  // GUI
  private isValidForm = false
  private form: boolean = false
  private step: number = 1
  private tab: number = 0

  // Element data
  private patientId: number = 0
  private elementIndex = -1
  private patient: Patient = createPatient()
  private elements: MedicalRecord[] = []
  private element: MedicalRecord = createMedicalRecord()

  // Validations
  private rules: object = {}

  /********************************************************
   *                     Initializable                     *
   ********************************************************/

  async beforeMount(): Promise<void> {
    this.patientId = Number(this.$route.params.id)
    this.findPatient()
    this.findElements()
    await this.$store.dispatch('loadOptions')
  }

  /********************************************************
   *                    API Services                       *
   ********************************************************/
  async createElement(): Promise<void> {}

  async findPatient(): Promise<void> {
    await patientService
      .findById(this.patientId)
      .then(async res => {
        res.sex = await this.$store.dispatch('optionNameById', res.sex)
        this.patient = res
      })
      .catch(err => {
        if (err.status === 404) this.$router.push({ name: 'Patients' })
      })
  }

  async findElements(search?: Search): Promise<void> {
    service.findByPatientId(this.patientId).then(res => {
      this.elements = res
    })
  }

  async updateElement(): Promise<void> {}

  async deleteElement(element: MedicalRecord): Promise<void> {
    /*await service
      .delete(element.id)
      .then(() => {
        this.elements.splice(this.elements.indexOf(element), 1)
        alert.onDeleteSuccess('Registro de  eliminado.')
      })
      .catch(err =>
        alert.onDeleteError(err, 'No se pudo eliminar el registro de .')
      )*/
  }

  async submit(): Promise<void> {
    // eslint-disable-next-line
    //@ts-expect-error
    await this.$refs.form.validate()
    if (this.isValidForm === true) {
      if (this.elementIndex > -1) await this.updateElement()
      else await this.createElement()
      this.reset()
    }
  }

  /********************************************************
   *                       Methods                         *
   ********************************************************/

  toEditElement(element: MedicalRecord): void {
    this.elementIndex = this.elements.indexOf(element)
    this.element = Object.assign({}, element)
  }

  showLog(element: MedicalRecord) {
    //@ts-ignore
    this.launchLog(element, {
      title: '',
      msg: 'MedicalRecord'
    })
  }

  reset(): void {
    this.elementIndex = -1
    this.element = createMedicalRecord()
    this.form = false

    // this.$refs.form.reset()
  }

  /********************************************************
   *                        Watch                         *
   ********************************************************/
  @Watch('$route.params.id')
  onPatientIdChange(newVal: string, oldVal: string) {
    if (newVal !== oldVal) {
      this.patientId = Number(newVal)
      this.findPatient()
      this.findElements()
    }
  }
}