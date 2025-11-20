import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { meditationStyles as s } from './StylesBiblioteca';
import { styles as baseStyles } from './Styles'; // contiene bottomBar y bottomButton

export default function BibliotecaScreen({ onBack }) {
    const categorias = [
        {
            title: 'Recomendadas para ti',
            items: [
                { title: 'Respira profundo', subtitle: '10 min – Reducir estrés' },
                { title: 'Enfócate', subtitle: '8 min – Concentración' },
                { title: 'Relajación rápida', subtitle: '5 min – Energía' },
            ],
        },
        {
            title: 'Más populares',
            items: [
                { title: 'Visualización', subtitle: '10 min – Para visualizar' },
                { title: 'Mindfulness', subtitle: '12 min – Atención plena' },
                { title: 'Sueño profundo', subtitle: '15 min – Dormir mejor' },
            ],
        },
        {
            title: 'Nuevas meditaciones',
            items: [
                { title: 'Gratitud diaria', subtitle: '7 min – Positividad' },
                { title: 'Meditación guiada', subtitle: '10 min – Relajación' },
                { title: 'Respiración consciente', subtitle: '5 min – Calma' },
            ],
        },
    ];

    const renderCard = (item, index) => (
        <TouchableOpacity key={index} style={s.card}>
            <View style={s.cardImage} />
            <View style={s.cardContent}>
                <Text style={s.cardTitle}>{item.title}</Text>
                <Text style={s.cardSubtitle}>{item.subtitle}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                style={s.container}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {/* Botón Volver */}
                <TouchableOpacity style={s.backButton} onPress={onBack}>
                    <Text style={s.backButtonText}>← Volver al Menú</Text>
                </TouchableOpacity>

                <Text style={s.mainTitle}>BIBLIOTECA DE MEDITACIONES</Text>

                {/* Renderizar todas las categorías */}
                {categorias.map((categoria, catIndex) => (
                    <View key={catIndex}>
                        <Text style={s.sectionTitle}>{categoria.title}</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={s.horizontalScroll}>
                                {categoria.items.map(renderCard)}
                            </View>
                        </ScrollView>
                    </View>
                ))}
            </ScrollView>

            {/* Barra inferior agregada */}
            <View style={baseStyles.bottomBar}>
                <TouchableOpacity style={baseStyles.bottomButton}>
                    <Text style={baseStyles.bottomText}>⚙️ Configuración</Text>
                </TouchableOpacity>
                <TouchableOpacity style={baseStyles.bottomButton} onPress={onBack}>
                    <Text style={baseStyles.bottomText}>🏠 Inicio</Text>
                </TouchableOpacity>
                <TouchableOpacity style={baseStyles.bottomButton}>
                    <Text style={baseStyles.bottomText}>⏰ Recordatorio</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
