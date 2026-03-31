#!/bin/bash
# Script para corregir el issue del ScrollView en MenuScreen.js

echo "Corrigiendo ScrollView en MenuScreen.js..."

# Buscar la línea que contiene "Barra inferior" y añadir </ScrollView> antes
sed -i 's/            {\/\* Barra inferior \*\/}/            <\/ScrollView>\n\n            {\/\* Barra inferior \*\/}/' MenuScreen.js

echo "Corrección aplicada. Por favor revisa MenuScreen.js"