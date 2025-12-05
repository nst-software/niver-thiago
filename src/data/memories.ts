export interface Memory {
	type: 'photo' | 'video';
	src: string;
	message?: string;
	author?: string;
}

export const memories: Memory[] = [
	{
		type: 'photo',
		src: '/assets/foto_exemplo.jpeg',
		message: 'Feliz aniversário, Thiago! Que saudade de você por aqui...',
		author: 'Família',
	},
	{
		type: 'video',
		src: '/assets/video_1.mp4',
		message: 'Memória especial para você, Thiago!',
		author: 'Arthur E Victor',
	},
	// Adicione mais memórias aqui seguindo o mesmo padrão:
	// {
	//   type: 'photo',
	//   src: '/assets/nome-do-arquivo.jpg',
	//   message: 'Sua mensagem carinhosa aqui',
	//   author: 'Quem mandou',
	// },
	// {
	//   type: 'video',
	//   src: '/assets/video-parabens.mp4',
	//   message: 'Um vídeo especial pra você!',
	//   author: 'Amigos',
	// },
];
