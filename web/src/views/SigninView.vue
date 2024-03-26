<template>
  <main class="h-full">
    <h1 style="margin: 100px">MT Bench Docker Front</h1>
    <Button class="top-50" @click="signIn">Google Sign in</Button>
  </main>
</template>

<script setup lang="ts">
import { useMutation } from '@urql/vue'
import { useToast } from 'primevue/usetoast'
import router from '@/router'
import firebase from '@/services/firebase'
import { graphql } from '@/gql'
import Signin from '@/doc/mutation/Signin'

const toast = useToast()

const { executeMutation: signinUser } = useMutation(graphql(Signin))

const signIn = async () => {
  await firebase.signinWithGoogle()
  const result = await signinUser({})
  if (result.error) {
    toast.add({
      severity: 'error',
      summary: 'Sign in',
      detail: result.error.message
    })
  } else {
    console.log('signin')
    router.push({ name: 'createGenerationTask' })
  }
}
</script>
