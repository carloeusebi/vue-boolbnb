<script>
import { axiosInstance } from '../assets/axios'
const endpoint = '/api/apartments/{apartment}/message'

export default {

    data() {
        return {
            form: {
                content: '',
                name: '',
                email: ''
            },
            errors: {},
        }
    },
    props: {
        apartment: {},
    },
    methods: {

        formValidation() {
            if (!this.form.email) this.props.errors.email = "L'indirizzo email  è obbligatiorio"
            else if (!this.form.email.includes('@') || this.form.email.length < 5) this.errors.email = "L'indirizzo email non è valido"
            if (!this.form.name) this.errors.name = "Il nome  è obbligatiorio"
            if (!this.form.content) this.errors.content = "Il messaggio è obbligatiorio"
            if (this.form.name.length > 40) this.errors.name = 'Il nome può essere lungo al massimo 40 caratteri'
            if (this.form.content.length > 350) this.errors.content = 'Il messaggio può essere lungo al massimo 350 caratteri'
        },


        refreshErrors(field) {
            this.errors[field] = ''
        },

        handleSubmit() {
            this.errors = {};
            this.formValidation();
            axiosInstance.post(endpoint, this.form)
                .then(res => console.log('messaggo inviato'))
                .catch(err => console.log(err.response.data))
        }
    },

}
</script>   




<template>
    <div class="card border rounded border-secondary-subtle">
        <div class="card-body d-flex align-items-center flex-column">
            <h4 class="card-title align-self-start">Contatta il proprietario</h4>
            <h6 class="card-subtitle mb-2 text-body-secondary py-2 align-self-start">
                <span class="fw-semibold">{{ apartment.name }}</span>
                - {{ apartment.address }}
            </h6>
            <form action="#" class="row px-3 g-2" @submit.prevent="handleSubmit" novalidate>
                <textarea name="content" id="content" cols="40" rows="4"
                    :class="[{ 'is-invalid': errors.content }, 'form-control', 'col']" placeholder="Messaggio*"
                    v-model.trim="form.content" @input="refreshErrors('content')"></textarea>
                <div class="invalid-feedback my-2">
                    {{ errors.content }}
                </div>
                <input type="text" name="name" id="name" placeholder="Nome*"
                    :class="[{ 'is-invalid': errors.name }, 'form-control']" v-model.trim="form.name"
                    @input="refreshErrors('name')">
                <div class="invalid-feedback my-2" v-if="errors.name">
                    {{ errors.name }}
                </div>
                <input type="text" name="email" id="email" placeholder="Email*"
                    :class="[{ 'is-invalid': errors.email }, 'form-control']" v-model.trim="form.email"
                    @input="refreshErrors('email')">
                <div class="invalid-feedback my-2" v-if="errors.email">
                    {{ errors.email }}
                </div>
                <p class="text-end">*campi obbligatori</p>
                <div>
                    <button type="submit" class="btn btn-primary"><font-awesome-icon :icon="['fas', 'paper-plane']" />
                        Invia Messaggio</button>
                </div>
            </form>
        </div>
    </div>
</template>







<style></style>