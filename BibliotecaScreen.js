import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Dimensions, Platform, KeyboardAvoidingView } from 'react-native';
import { meditationStyles as s } from './StylesBiblioteca';
import { styles as baseStyles } from './Styles';

const { height } = Dimensions.get('window');

const MEDITACIONES = [
    {
        id: 1,
        title: 'Respira profundo',
        subtitle: '10 min – Reducir estrés',
        duration: '10 minutos',
        icon: '🌬️',
        category: 'Recomendadas para ti',
        description: 'Una técnica respiratoria simple pero poderosa que calma el sistema nervioso y reduce el estrés en minutos.',
        benefits: [
            '✓ Reduce cortisol y estrés',
            '✓ Mejora la claridad mental',
            '✓ Estabiliza la presión arterial',
            '✓ Aumenta la calma inmediata'
        ]
    },
    {
        id: 2,
        title: 'Enfócate',
        subtitle: '8 min – Concentración',
        duration: '8 minutos',
        icon: '🎯',
        category: 'Recomendadas para ti',
        description: 'Mejora tu concentración y enfoque mental con esta meditación diseñada para aumentar la productividad y la claridad de pensamiento.',
        benefits: [
            '✓ Aumenta concentración',
            '✓ Reduce distracciones mentales',
            '✓ Mejora productividad',
            '✓ Potencia la memoria'
        ]
    },
    {
        id: 3,
        title: 'Relajación rápida',
        subtitle: '5 min – Energía',
        duration: '5 minutos',
        icon: '⚡',
        category: 'Recomendadas para ti',
        description: 'Recarga tu energía rápidamente con esta meditación corta y efectiva, perfecta para pausas durante el día.',
        benefits: [
            '✓ Energía renovada',
            '✓ Libera tensión muscular',
            '✓ Mejora el ánimo',
            '✓ Rápida y eficiente'
        ]
    },
    {
        id: 4,
        title: 'Visualización',
        subtitle: '10 min – Para visualizar',
        duration: '10 minutos',
        icon: '🌈',
        category: 'Más populares',
        description: 'Utiliza el poder de la visualización para manifestar tus objetivos y crear la vida que deseas. Técnica probada para el éxito mental.',
        benefits: [
            '✓ Potencia manifestación',
            '✓ Clarifica objetivos',
            '✓ Aumenta confianza',
            '✓ Mejora autodisciplina'
        ]
    },
    {
        id: 5,
        title: 'Mindfulness',
        subtitle: '12 min – Atención plena',
        duration: '12 minutos',
        icon: '🧘',
        category: 'Más populares',
        description: 'Desarrolla atención plena y presencia en el momento actual. Una práctica fundamental para la paz interior y el bienestar.',
        benefits: [
            '✓ Presencia y consciencia',
            '✓ Reduce ansiedad',
            '✓ Mejora relaciones',
            '✓ Aumenta aceptación'
        ]
    },
    {
        id: 6,
        title: 'Sueño profundo',
        subtitle: '15 min – Dormir mejor',
        duration: '15 minutos',
        icon: '😴',
        category: 'Más populares',
        description: 'Alcanza un sueño profundo y reparador con esta meditación diseñada para tranquilizar la mente y relajar completamente el cuerpo.',
        benefits: [
            '✓ Sueño de calidad',
            '✓ Recuperación total',
            '✓ Reduce insomnio',
            '✓ Refresca el cuerpo'
        ]
    },
    {
        id: 7,
        title: 'Gratitud diaria',
        subtitle: '7 min – Positividad',
        duration: '7 minutos',
        icon: '🙏',
        category: 'Nuevas meditaciones',
        description: 'Cultiva una actitud de gratitud que transforma tu perspectiva y atrae más abundancia a tu vida. Aumenta la felicidad real.',
        benefits: [
            '✓ Mayor positividad',
            '✓ Aumenta felicidad',
            '✓ Atrae abundancia',
            '✓ Mejora relaciones'
        ]
    },
    {
        id: 8,
        title: 'Meditación guiada',
        subtitle: '10 min – Relajación',
        duration: '10 minutos',
        icon: '🎵',
        category: 'Nuevas meditaciones',
        description: 'Una guía experta te lleva a través de una relajación profunda, liberando todas las tensiones del cuerpo y la mente.',
        benefits: [
            '✓ Relajación completa',
            '✓ Liberación de tensiones',
            '✓ Paz profunda',
            '✓ Descanso total'
        ]
    },
    {
        id: 9,
        title: 'Respiración consciente',
        subtitle: '5 min – Calma',
        duration: '5 minutos',
        icon: '💨',
        category: 'Nuevas meditaciones',
        description: 'Domina técnicas de respiración consciente para activar tu parasimpático y lograr calma instantánea en cualquier momento.',
        benefits: [
            '✓ Calma instantánea',
            '✓ Sistema nervioso relajado',
            '✓ Mayor control emocional',
            '✓ Equilibrio energético'
        ]
    }
];

export default function BibliotecaScreen({ onBack }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [showTimer, setShowTimer] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // Extraer minutos de duration (ej: "10 minutos" -> 10)
    const getDurationInMinutes = (durationStr) => {
        const match = durationStr.match(/\d+/);
        return match ? parseInt(match[0]) : 10;
    };

    // Iniciar temporizador cuando se abre
    useEffect(() => {
        if (selectedItem && showTimer && !isRunning && timeLeft === 0) {
            const minutes = getDurationInMinutes(selectedItem.duration);
            setTimeLeft(minutes * 60);
        }
    }, [selectedItem, showTimer]);

    // Lógica del temporizador
    useEffect(() => {
        let interval;
        if (isRunning && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isRunning) {
            setIsRunning(false);
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft]);

    const handlePlayPause = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        const minutes = getDurationInMinutes(selectedItem.duration);
        setTimeLeft(minutes * 60);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const categorias = [
        {
            title: 'Recomendadas para ti',
            items: MEDITACIONES.filter(m => m.category === 'Recomendadas para ti')
        },
        {
            title: 'Más populares',
            items: MEDITACIONES.filter(m => m.category === 'Más populares')
        },
        {
            title: 'Nuevas meditaciones',
            items: MEDITACIONES.filter(m => m.category === 'Nuevas meditaciones')
        },
    ];

    const renderCard = (item, index) => (
        <TouchableOpacity 
            key={index} 
            style={s.card}
            onPress={() => setSelectedItem(item)}
            activeOpacity={0.85}
        >
            <View style={s.cardImage}>
                <Text style={s.cardIcon}>{item.icon}</Text>
            </View>
            <View style={s.cardContent}>
                <Text style={s.cardTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={s.cardSubtitle} numberOfLines={2}>{item.subtitle}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={{ flex: 1 }}>
                <ScrollView
                    style={s.container}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    scrollEnabled={!selectedItem}
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
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEnabled={!selectedItem}>
                                <View style={s.horizontalScroll}>
                                    {categoria.items.map(renderCard)}
                                </View>
                            </ScrollView>
                        </View>
                    ))}
                </ScrollView>

                {/* Modal de Detalle */}
                <Modal
                    transparent
                    animationType="slide"
                    visible={!!selectedItem && !showTimer}
                    onRequestClose={() => setSelectedItem(null)}
                >
                    <View style={s.modalContainer}>
                        <ScrollView 
                            style={s.detailSheet}
                            nestedScrollEnabled={true}
                            scrollEnabled={true}
                        >
                            {selectedItem && (
                                <>
                                    <View style={s.detailHeader}>
                                        <Text style={s.detailIcon}>{selectedItem.icon}</Text>
                                        <TouchableOpacity onPress={() => setSelectedItem(null)}>
                                            <Text style={s.closeButton}>✕</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <Text style={s.detailTitle}>{selectedItem.title}</Text>
                                    <Text style={s.detailDuration}>⏱️ {selectedItem.duration}</Text>

                                    <Text style={s.detailDescription}>
                                        {selectedItem.description}
                                    </Text>

                                    <View style={s.detailBenefits}>
                                        <Text style={s.benefitTitle}>Beneficios:</Text>
                                        {selectedItem.benefits.map((benefit, idx) => (
                                            <Text key={idx} style={s.benefitItem}>
                                                {benefit}
                                            </Text>
                                        ))}
                                    </View>

                                    <TouchableOpacity 
                                        style={s.playButton}
                                        onPress={() => {
                                            setShowTimer(true);
                                            const minutes = getDurationInMinutes(selectedItem.duration);
                                            setTimeLeft(minutes * 60);
                                            setIsRunning(false);
                                        }}
                                    >
                                        <Text style={s.playButtonText}>▶️ Comenzar Meditación</Text>
                                    </TouchableOpacity>

                                    <View style={{ height: 20 }} />
                                </>
                            )}
                        </ScrollView>
                    </View>
                </Modal>

                {/* Modal Temporizador */}
                <Modal
                    transparent
                    animationType="slide"
                    visible={!!selectedItem && showTimer}
                    onRequestClose={() => {
                        setShowTimer(false);
                        setIsRunning(false);
                    }}
                >
                    <View style={s.timerModalContainer}>
                        <View style={s.timerContent}>
                            {selectedItem && (
                                <>
                                    {/* Ícono y título */}
                                    <Text style={s.timerIcon}>{selectedItem.icon}</Text>
                                    <Text style={s.timerTitle}>{selectedItem.title}</Text>
                                    
                                    {/* Mensaje guiado */}
                                    <Text style={s.timerGuide}>
                                        {isRunning ? '🧘 Respira profundo y mantén la calma' : '✨ Presiona play para comenzar'}
                                    </Text>

                                    {/* Cronómetro */}
                                    <View style={s.timerDisplay}>
                                        <Text style={s.timerText}>{formatTime(timeLeft)}</Text>
                                    </View>

                                    {/* Controles */}
                                    <View style={s.timerControls}>
                                        <TouchableOpacity 
                                            style={s.timerButton}
                                            onPress={handlePlayPause}
                                        >
                                            <Text style={s.timerButtonText}>
                                                {isRunning ? '⏸ Pausar' : '▶ Reanudar'}
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity 
                                            style={[s.timerButton, s.timerButtonSecondary]}
                                            onPress={handleReset}
                                        >
                                            <Text style={s.timerButtonText}>🔄 Reiniciar</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {/* Botón Salir */}
                                    <TouchableOpacity 
                                        style={s.timerExitButton}
                                        onPress={() => {
                                            setShowTimer(false);
                                            setIsRunning(false);
                                        }}
                                    >
                                        <Text style={s.timerExitText}>✕ Salir de la Meditación</Text>
                                    </TouchableOpacity>

                                    {/* Progreso */}
                                    <View style={s.progressBar}>
                                        <View 
                                            style={[
                                                s.progressFill,
                                                {
                                                    width: `${((getDurationInMinutes(selectedItem.duration) * 60 - timeLeft) / (getDurationInMinutes(selectedItem.duration) * 60)) * 100}%`
                                                }
                                            ]}
                                        />
                                    </View>
                                </>
                            )}
                        </View>
                    </View>
                </Modal>

                {/* Barra inferior */}
                {!selectedItem && (
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
                )}
            </View>
        </KeyboardAvoidingView>
    );
}
