<script setup lang="ts">
import * as z from 'zod'
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui';
import { capitalize } from 'vue';

const fields: AuthFormField[] = [{
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
    name: 'remember',
    type: 'checkbox',
    label: 'remember me',
    description: 'you will be logged in for 10 days'
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
            <UAuthForm :schema="schema" title="Welcome back! Please login yourself." icon="fa6-solid-circle-user"
                :fields="fields" :submit="{
                    label: capitalize('continue'),
                    color: 'success',
                    variant: 'subtle'
                }" @submit="onSubmit">
                <template #description>
                    Don't have an account? <ULink to="/auth/register" class="text-primary font-medium">{{ capitalize('sign up') }}</ULink>
                </template>
                <template #password-hint>
                    <ULink to="#" class="text-primary font-medium" tabindex="-1">{{ capitalize('forgot password?') }}</ULink>
                </template>
                <template #validation>
                    <UAlert color="error" icon="i-lucide-info" :title="capitalize('error signing in')" />
                </template>
                <template #footer>
                    By signing in, you agree to our <ULink to="#" class="text-primary font-medium"> {{ capitalize('terms of service') }}.</ULink>
                </template>
            </UAuthForm>
        </UPageCard>
    </div>
</template>