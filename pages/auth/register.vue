<script setup lang="ts">
import * as z from 'zod'
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui';
import { capitalize } from 'vue';

const fields: AuthFormField[] = [
    {
        name: 'username',
        type: 'text',
        label: 'username',
        placeholder: 'enter your username',
        required: true
    },
    {
        name: 'email',
        type: 'email',
        label: 'email',
        placeholder: 'enter your email',
        required: true
    },
    {
        name: 'password',
        type: 'password',
        label: 'password',
        placeholder: 'enter your password',
        required: true
    },
    {
        name: 'confirmpassword',
        type: 'password',
        label: 'confirm password',
        placeholder: 'confirm your password',
        required: true
    }];

const schema = z.object({
    email: z.email('Invalid email'),
    password: z.string('Password is required').min(12, 'Must be at least 12 characters')
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
    console.log('Submitted', payload)
}
</script>

<template>
    <div class="flex flex-col items-center justify-center p-4 gap-4">
        <UPageCard class="w-full max-w-md">
            <UAuthForm :schema="schema" title="Welcome! Please register yourself." icon="fa6-solid-circle-user"
                :fields="fields" :submit="{
                    label: capitalize('continue'),
                    color: 'success',
                    variant: 'subtle'
                }" @submit="onSubmit">
                <template #description>
                    Already have an account? <ULink to="/auth/login" class="text-primary font-medium">Sign in</ULink>
                </template>
                <template #password-hint>
                    <ULink to="#" class="text-primary font-medium" tabindex="-1">{{ capitalize('forgot password?') }}</ULink>
                </template>
                <template #validation>
                    <UAlert color="error" icon="i-lucide-info" :title="capitalize('error signing up')" />
                </template>
                <template #footer>
                    By signing up, you agree to our <ULink to="#" class="text-primary font-medium"> {{ capitalize('terms of service') }}.</ULink>
                </template>
            </UAuthForm>
        </UPageCard>
    </div>
</template>