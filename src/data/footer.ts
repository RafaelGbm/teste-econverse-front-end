import facebookIcon from '../assets/Facebook.svg'
import instagramIcon from '../assets/Instagram.svg'
import linkedinIcon from '../assets/Linkedin.svg'
import type { FooterColumn, SocialLink } from '../types/footer'

export const footerColumns: FooterColumn[] = [
  {
    id: 'institucional',
    title: 'Institucional',
    links: ['Sobre Nós', 'Movimento', 'Trabalhe conosco'],
  },
  {
    id: 'ajuda',
    title: 'Ajuda',
    links: ['Suporte', 'Fale Conosco', 'Perguntas Frequentes'],
  },
  {
    id: 'termos',
    title: 'Termos',
    links: ['Termos e Condições', 'Política de Privacidade', 'Troca e Devolução'],
  },
]

export const socialLinks: SocialLink[] = [
  { id: 'instagram', name: 'Instagram', icon: instagramIcon },
  { id: 'facebook', name: 'Facebook', icon: facebookIcon },
  { id: 'linkedin', name: 'LinkedIn', icon: linkedinIcon },
]
