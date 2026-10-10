package com.ifpr.gastronomique.api.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.server.ResponseStatusException;
import com.ifpr.gastronomique.api.enums.StatusAulaEnum;
import com.ifpr.gastronomique.api.models.Aula;
import com.ifpr.gastronomique.api.models.Insumo;
import com.ifpr.gastronomique.api.models.ItemAula;
import com.ifpr.gastronomique.api.models.ListaDeCompra;
import com.ifpr.gastronomique.api.repositories.AulaRepository;
import com.ifpr.gastronomique.api.repositories.ListaDeCompraRepository;

class ListaDeCompraServiceTests {
    private ListaDeCompraService service;
    private AulaRepository aulas;
    private ListaDeCompraRepository compras;

    @BeforeEach
    void setUp() {
        service = new ListaDeCompraService();
        aulas = mock(AulaRepository.class);
        compras = mock(ListaDeCompraRepository.class);
        ReflectionTestUtils.setField(service, "aulaRepository", aulas);
        ReflectionTestUtils.setField(service, "listaDeCompraRepository", compras);
        when(compras.save(any(ListaDeCompra.class))).thenAnswer(call -> call.getArgument(0));
    }

    @Test
    void rejectsEmptySelectionWithoutWritingData() {
        assertThrows(ResponseStatusException.class, () -> service.salvarListaDeCompra(List.of()));
        verifyNoInteractions(aulas, compras);
    }

    @Test
    void aggregatesTheSameIngredientWithLargeIdsAndDeduplicatesClasses() {
        Aula first = aula(10L, 2.0, 6.0);
        Aula second = aula(11L, 3.0, 9.0);
        when(aulas.findById(10L)).thenReturn(Optional.of(first));
        when(aulas.findById(11L)).thenReturn(Optional.of(second));

        ListaDeCompra result = service.salvarListaDeCompra(List.of(10L, 11L, 10L)).getBody();

        assertNotNull(result);
        assertEquals(1, result.getItensDaListaDeCompra().size());
        assertEquals(5.0, result.getItensDaListaDeCompra().get(0).getQuantidade(), 0.00001);
        assertEquals(15.0, result.getItensDaListaDeCompra().get(0).getValor(), 0.00001);
        assertEquals(StatusAulaEnum.FINALIZADA, first.getStatus());
        assertSame(result, second.getListaDeCompra());
        verify(aulas).save(first);
        verify(aulas).save(second);
    }

    @Test
    void rejectsUnapprovedClassesBeforeSavingTheList() {
        Aula aula = aula(10L, 2.0, 6.0);
        aula.setStatus(StatusAulaEnum.REVISAO);
        when(aulas.findById(10L)).thenReturn(Optional.of(aula));
        assertThrows(ResponseStatusException.class, () -> service.salvarListaDeCompra(List.of(10L)));
        verify(compras, never()).save(any());
        verify(aulas, never()).save(any());
    }

    private Aula aula(Long id, double quantity, double value) {
        Insumo insumo = new Insumo();
        insumo.setId(Long.valueOf("1000"));
        ItemAula item = new ItemAula();
        item.setInsumo(insumo);
        item.setQuantidade(quantity);
        item.setValorTotal(value);
        Aula aula = new Aula();
        aula.setId(id);
        aula.setStatus(StatusAulaEnum.APROVADA);
        aula.setItensAula(List.of(item));
        return aula;
    }
}
