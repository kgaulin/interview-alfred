<script setup lang="ts">
import { ref } from 'vue';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios';
import { Card, CardContent, CardTitle } from './components/ui/card';
import { Label } from './components/ui/label';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

const queryClient = useQueryClient()

// GET IMAGES
const fetchImages = async () => {
  const response = await axios.get('http://localhost:3000/api/images');
  return response.data;
};

const { data: images, isQueryLoading } = useQuery({
  queryKey: ['images'],
  queryFn: fetchImages,
  refetchInterval: 1000*6,  // Refetch de la donnée toutes les 6 secondes pour avoir le status le plus récent
  notifyOnChangeProps: ['data'],
});

// POST IMAGE
const formData = ref({
  name: '',
  file: '',
});

const { mutate: postMutate, isLoading: isPostLoading, isError: isPostError, error: postError } = useMutation({
  mutationFn: async (postData) => {
    const formData = new FormData();
    formData.append('name', postData.name);
    formData.append('file', postData.file);

    const response = await axios.post('http://localhost:3000/api/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },
  onMutate: async (newImage) => {
    await queryClient.cancelQueries({ queryKey: ['images'] })
    const previousImages = queryClient.getQueryData(['images'])
    queryClient.setQueryData(['images'], (old) => [...old, newImage])
    return { previousImages }
  },
  onError: (err, newImage, context) => {
    queryClient.setQueryData(['images'], context.previousImages)
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['images'] })
  },
});

const submitForm = async () => {
  try {
    await postMutate(formData.value);
  } catch (err) {
    console.error(err);
  }
};

const handleFileChange = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    formData.value.file = files[0];
  }
};

// DELETE IMAGE
const { mutate: deleteMutate, isLoading: isDeleteLoading, isError: isDeleteError, error: deleteError } = useMutation({
  mutationFn: async (id) => {
    const response = await axios.delete(`http://localhost:3000/api/images/${id}`);
    return response.data;
  },
  onMutate: async (deletedImage) => {
    await queryClient.cancelQueries({ queryKey: ['images'] })
    const previousImages = queryClient.getQueryData(['images'])
    queryClient.setQueryData(['images'], (data) => data)
    return { previousImages }
  },
  onError: (err, deletedImage, context) => {
    queryClient.setQueryData(['images'], context.previousImages)
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['images'] })
  },
});

const deleteImage = async (imageId: string) => {
  try {
    await deleteMutate(imageId);
  } catch (err) {
    console.error(err);
  }
};

</script>

<template>
  <div class="container mx-">
    <div class="my-5">
      <form @submit.prevent="submitForm" class="flex space-x-4">
        <Input v-model="formData.name" type="text" placeholder="Name" />
        <Input type="file" @change="handleFileChange" />
        <Button type="submit">Soumettre</Button>
      </form>
    </div>

    <div class="text-center p-5" v-if="isQueryLoading || isPostLoading || isDeleteLoading">Chargement en cours...</div>
    <div class="text-center p-5" v-if="isPostError">Une erreur s'est produite</div>
    <div class="text-center p-5" v-if="isDeleteError">Une erreur s'est produite</div>

    <div v-else class="flex flex-col space-y-5">
      <Card v-for="(image, index) in images" :key="index">
        <CardContent class="flex justify-between">
          <div>
            <CardTitle> {{ image.name }}</CardTitle>
            <Label> {{ image.status }}</Label>
          </div>
          <button @click="deleteImage(image.id)">Supprimer l'image</button>
        </CardContent>

      </Card>
    </div>
  </div>
</template>